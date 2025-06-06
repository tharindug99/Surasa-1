<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\OrderItem;

class OrderItemObserver
{
    /**
     * Handle the OrderItem "created" event.
     */
    public function created(OrderItem $orderItem): void
    {
        $this->updateOrderTotalPrice($orderItem->order);
    }

    /**
     * Handle the OrderItem "updated" event.
     */
    public function updated(OrderItem $orderItem): void
    {
        // Only update if total_cost has changed or if you want to be safe
        if ($orderItem->isDirty('total_cost') || $orderItem->isDirty('quantity') || $orderItem->isDirty('price')) {
            $this->updateOrderTotalPrice($orderItem->order);
        }
        // If an order item's order_id could change (uncommon for updates),
        // you would also need to update the total for the original order.
        // $originalOrderId = $orderItem->getOriginal('order_id');
        // if ($originalOrderId && $originalOrderId !== $orderItem->order_id) {
        //     $oldOrder = Order::find($originalOrderId);
        //     if ($oldOrder) $this->updateOrderTotalPrice($oldOrder);
        // }
    }

    /**
     * Handle the OrderItem "deleted" event.
     */
    public function deleted(OrderItem $orderItem): void
    {
        // $orderItem->order might be null if the relationship is already detached
        // It's often safer to use $orderItem->order_id if the order might be soft deleted or for other edge cases.
        $order = Order::find($orderItem->order_id);
        if ($order) {
            $this->updateOrderTotalPrice($order);
        }
    }

    /**
     * Handle the OrderItem "force deleted" event (if using soft deletes).
     */
    public function forceDeleted(OrderItem $orderItem): void
    {
        $order = Order::find($orderItem->order_id);
        if ($order) {
            $this->updateOrderTotalPrice($order);
        }
    }

    /**
     * Recalculates and saves the total price for the given order.
     */
    protected function updateOrderTotalPrice(?Order $order): void // Allow null Order
    {
        if ($order) {
            // Ensure the orderItems relation is fresh
            $order->load('orderItems');
            $order->price = $order->orderItems()->sum('total_cost');
            $order->save();
        }
    }
}
