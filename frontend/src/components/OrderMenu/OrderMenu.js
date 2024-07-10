import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Food from "./Food";
import Beverages from "./Beverages";
import { brown, yellow, white } from "@mui/material/colors";
import { Button } from "@mui/material";

const Section = styled.div`
  height: 100vh;
  background: blue;
  scroll-snap-align: center;
`;

function Tabs() {
  const [activeTab, setActiveTab] = useState("Food");
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    navigate("/order");
  };

  return (
    <section>
      <div className="container px-20 lg:mb-20 md:mb-16" id="menu">
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          className="container lg:py-5 sm:py-10"
        >
          <div className="lg:w-[740px] mx-auto ">
            <h2 className="heading text-center font-medium text-[50px]">
              Today's Menu
            </h2>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "1rem",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            disableElevation
            variant={activeTab === "Food" ? "contained" : "contained"}
            sx={{
              paddingY: "0.5rem",
              paddingX: "1rem",
              marginX: "0.5rem",
              outline: "none",
              bgcolor: "transparent",
              backgroundColor: activeTab === "Food" ? "#F0C903" : "transparent", // bg-yellow-400
              borderRadius: "4px", // rounded-md
              fontWeight: "bold", // font-semibold
              color: "#291603", // text-brown-600
              "&:hover": {
                backgroundColor:
                  activeTab === "Food" ? "#F0C903" : "transparent", // No change on hover
                color: "#291603", // No change on hover
                boxShadow: "none", // Remove box shadow
              },
              "&:focus": {
                outline: "none", // Remove focus outline
              },
            }}
            onClick={() => setActiveTab("Food")}
          >
            Food
          </Button>
          <Button
            size="large"
            disableElevation
            variant={activeTab === "Beverages" ? "contained" : "contained"}
            sx={{
              paddingY: "0.5rem",
              paddingX: "1rem",
              marginX: "0.5rem",
              outline: "none",
              bgcolor: "transparent",
              backgroundColor:
                activeTab === "Beverages" ? "#F0C903" : "transparent", // bg-yellow-400
              borderRadius: "4px", // rounded-md
              fontWeight: "bold", // font-semibold
              color: "#291603", // text-brown-600
              "&:hover": {
                backgroundColor:
                  activeTab === "Beverages" ? "#F0C903" : "transparent", // No change on hover
                color: "#291603", // No change on hover
                boxShadow: "none", // Remove box shadow
              },
              "&:focus": {
                outline: "none", // Remove focus outline
              },
            }}
            onClick={() => setActiveTab("Beverages")}
          >
            Beverages
          </Button>
        </div>
        <div className="mt-4">
          {activeTab === "Food" && <Food />}
          {activeTab === "Beverages" && <Beverages />}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleOrderNowClick}
              className="px-6 py-3 mb-20 bg-SurasaBrown text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
            >
              Order Now !!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tabs;
