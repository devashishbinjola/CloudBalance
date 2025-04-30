export const loginConfig = {

    form: {
      logo: {
        src: "../src/assets/logocloudbalance.png", 
        alt: "CloudBalance Logo"
      },
      inputs: [
        {
          type: "text",
          placeholder: "Email",
          name: "username",
          required: true
        },
        {
          type: "password",
          placeholder: "Password",
          name: "password",
          required: true
        }
      ],
      submitButton: {
        text: "LOGIN"
      }
    },
  
   
    navigation: {
      admin: {
        path: "/dashboard/user-management"
      },
      default: {
        path: "/dashboard"
      }
    },
  
   
    messages: {
      success: "Login successful!",
      error: "Invalid credentials. Please try again."
    },
  
   
    footer: {
      links: [
        {
          text: "Contact Us",
          path: "/contact"
        },
        {
          text: "Terms and Conditions",
          path: "/terms"
        }
      ]
    },
  
    
    toast: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    }
  };