# Currency Swap Form  

This project is a **Currency Swap Form** that allows users to swap assets from one currency to another. It is designed to be intuitive, visually appealing, and interactive.  

---

## 1. Overview  

The Currency Swap Form:  
- Retrieves the latest token prices from [Switcheo's Price API](https://interview.switcheo.com/prices.json).  
- Displays token images using the [Token Icons Repository](https://github.com/Switcheo/token-icons/tree/main/tokens).  
- Allows users to select the source and target currencies, enter an amount, and view the converted value.  

---

## 3. Technology Stack  

- **React**: Frontend framework for building dynamic UI components.  
- **Axios**: For fetching token prices from the external API.  
- **Tailwind CSS**: For responsive and modern styling.  

---

## 4. Installation  
1. Install dependencies:  
    ```sh
    npm install
    ```

2. Start the development server:  
    ```sh
    npm start
    ```

3. Open the application in your browser at:  
    ```
    http://localhost:5173
    ```

---

## 5. Usage  

- **Select Currencies**: Choose the source and target currencies from dropdowns with images.  
- **Enter Amount**: Input the amount to convert.  
- **View Conversion**: The converted value updates instantly as you type.  

---

## 6. API & Data Sources  

- **Price Information**:  
    - Source: [Switcheo's Price API](https://interview.switcheo.com/prices.json)  
    - Used to get the latest exchange rates.  
- **Token Images**:  
    - Source: [Token Icons Repository](https://github.com/Switcheo/token-icons/tree/main/tokens)  
    - Example URL:  
    ```
    https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg
    ```

---

## 8. Screenshots  

