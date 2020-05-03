import Login from "./Screens/Login";

const confige={
     firebaseConfig : {
        apiKey: "AIzaSyBZ-62rV6RFRSSQz54VY2OjczX43EZKBkk",
        authDomain: "hack-book-e9b0a.firebaseapp.com",
        databaseURL: "https://hack-book-e9b0a.firebaseio.com",
        projectId: "hack-book-e9b0a",
        storageBucket: "hack-book-e9b0a.appspot.com",
        messagingSenderId: "280531013065",
        appId: "1:280531013065:web:9ee86da43ba6a4c68d6c18",
        measurementId: "G-K3J3J0SQMM"
      },
    navigation:{
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            },
        },
    }
}
export default confige;