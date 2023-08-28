const firebaseConfig = {
    apiKey: "AIzaSyBFFYRDlcEQvVOt9qRxSL6Mhue15vNXIL0",
    authDomain: "acuity-9e3bf.firebaseapp.com",
    projectId: "acuity-9e3bf",
    storageBucket: "acuity-9e3bf.appspot.com",
    messagingSenderId: "655545742864",
    appId: "1:655545742864:web:bc380419b5cba088937c95"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

actualPassword = document.cookie.split(';')[1].split('=')[1]

async function getPasswords(){
    temppasswords = []
    firestore.collection(document.cookie.split(';')[0].split('=')[1]).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            passwords.push(doc.data())
            temppasswords.push(doc.data())
        });
        displayPasswords(temppasswords)
    });
}

async function setPassword(jsonObj){
    firestore.collection(document.cookie.split(';')[0].split('=')[1]).doc(jsonObj.title).set({
        title: jsonObj.title,
        username: jsonObj.username,
        password: CryptoJS.AES.encrypt(jsonObj.password,actualPassword).toString(),
        website: jsonObj.website,
        note: jsonObj.note
    })
}

async function removePassword(title){
    firestore.collection(document.cookie.split(';')[0].split('=')[1]).doc(title).delete()
}