import { SAVE_CONTACT_US, ADD_CONTACT_US, UPDATE_CONTACT_US, REMOVE_CONTACT_US } from "redux/constants/ContactUs";

const initState = {
  contactUsMessages: [],
  currentContactUs: null,
};

const ContactUs = (state = initState, action) => {
  switch (action.type) {
    case SAVE_CONTACT_US:
      return {
        ...state,
        contactUsMessages: action.payload,
      };

    case ADD_CONTACT_US:
      return {
        ...state,
        contactUsMessages: [...state.contactUsMessages, action.payload],
      };

    case UPDATE_CONTACT_US:
      const updatedContactUsMessages = state.contactUsMessages.map((message) =>
          message.id === action.payload.id ? action.payload : message
      );
      return {
        ...state,
        contactUsMessages: updatedContactUsMessages,
        currentContactUs: action.payload.id === state.currentContactUs?.id ? action.payload : state.currentContactUs,
      };

    case REMOVE_CONTACT_US:
      const filteredContactUsMessages = state.contactUsMessages.filter((message) => message.id !== action.payload.id);
      return {
        ...state,
        contactUsMessages: filteredContactUsMessages,
        currentContactUs: state.currentContactUs?.id === action.payload.id ? null : state.currentContactUs,
      };

    default:
      return state;
  }
};

export default ContactUs;