import React from "react";
import firebase from "firebase";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./App.css";

firebase.initializeApp({
    apiKey: "AIzaSyBPwozVhSdpyYKRHCBOeO9PBARkfVaFk3Q",
    authDomain: "react-firebase-auth-2b840.firebaseapp.com",
});

class App extends React.Component {
    state = { isSigned: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSucess: () => false,
        },
    };

    componentDidMount = () => {
        
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ isSigned: !!user });
        });
    };
    render() {
        return (
            <div className="App">
                {this.state.isSigned ? (
                    <>
                        <h1>Signed In</h1>
                        <h3>
                            welcome {firebase.auth().currentUser.displayName}
                        </h3>
                        <img src={firebase.auth().currentUser.photoURL} />
                        <button onClick={() => firebase.auth().signOut()}>
                            Sign out
                        </button>
                    </>
                ) : (
                    <StyleFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>
        );
    }
}

export default App;
