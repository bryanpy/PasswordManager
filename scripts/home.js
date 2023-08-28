selected = ""
passwords = []

let titleElement = document.getElementById("input-title")
let usernameElement = document.getElementById("input-user")
let passwordElement = document.getElementById("input-password")
let websiteElement = document.getElementById("input-website")
let noteElement = document.getElementById("input-note")

getPasswords()

function toggleShowPassword(){
	var x = document.getElementById("input-password");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

function displayPasswords(defpassword = passwords, clear = true){
	if(clear){
		document.getElementById("items-container").innerHTML = ""
	}
	if(defpassword.length > 0){
		defpassword.forEach(pass => {
			var container = document.createElement("div")
			container.classList.add("item-container")

			container.innerHTML = `<div class="item-container" onclick="select('${pass.title}')"><div class="item-details"><img class="item-image" src="../Assets/Favicon.png" alt="logo"><div><span class="item-title">${pass.title}</span><span class="item-username">${pass.username}</span></div></div></div>`
			
			document.getElementById("items-container").appendChild(container);
		});
	}else{
		var text = document.createElement("span")
		text.innerHTML = "No Records"
		text.classList.add("no-records")
		
		document.getElementById("items-container").appendChild(text);
	}
    updateColor()
}

function select(title){
	selected = title;
	displaySelected();

	let container = document.getElementById("items-container")
	let flag = false

	document.getElementById("new-record-auto-password").style.visibility="visible";

	container.childNodes.forEach(element => {
		
		if(element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML == selected){
			element.classList.add('selected-password')
			document.getElementById("new-record-auto-password").style.visibility="hidden";
		}else{
			element.classList.remove('selected-password')
		}
	});
}

function clearSelection(){
	selected = ''
	displaySelected()
	select('')
}

function displaySelected(){
	let text = document.getElementById("new-record-title-text")
	if (selected){
		
		passwords.forEach(element => {
			if(element.title == selected){
				text.innerHTML = "Viewing/Editing " + element.title
				titleElement.value = element.title
				usernameElement.value = element.username
				passwordElement.value = CryptoJS.AES.decrypt(element.password,actualPassword).toString(CryptoJS.enc.Utf8)
				websiteElement.value = element.website
				noteElement.value = element.note
			}
		});
	}else{
		text.innerHTML = "New Record"
		titleElement.value = ""
		usernameElement.value = ""
		passwordElement.value = ""
		websiteElement.value = ""
		noteElement.value = ""
	}
    updateColor()
}

function addPassword(){
	setPassword({
		title: titleElement.value,
		username: usernameElement.value,
		password: passwordElement.value,
		website: websiteElement.value,
		note: noteElement.value
	})
    updateColor()

	let container = document.getElementById("items-container")
	let flag = true

	container.childNodes.forEach(element => {
		if(!(element.classList.contains("no-records"))){
			if(element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML == titleElement.value){
				flag = false
			}
		}
	});

	if(flag){
		console.log(flag)
		passwords.push({
			title: titleElement.value,
			username: usernameElement.value,
			password: passwordElement.value,
			website: websiteElement.value,
			note: noteElement.value
		})
	}

    displayPasswords()
}

function deletePassword(){
	removePassword(titleElement.value)
	tempArray = []
	passwords.forEach(element => {
		if(element.title != titleElement.value){
			tempArray.push(element)
		}
	});
	passwords = tempArray
	displayPasswords()
}

function updateColor(){
    let password = document.getElementById("input-password").value
	let sec_level = 0

	let smletters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	let bgletters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	let symbols = ['~','!','`','@','#','$','%','^','&','*','(',')','_','+','{','}','|','\\','\"',':',"'",';','?','/','>','<',',','.','-','=','[',']']
	let numbers = ['1','2','3','4','5','6','7','8','9','0']

	let hassmletters = false
	let hasbgletters = false
	let hassymbols = false
	let hasnumbers = false

	let addition = ""

	password.split("").forEach(char => {
		if(smletters.includes(char) && hassmletters == false){
			sec_level += 20
			hassmletters = true
			addition  = ", Add uppercase letter to make it more secure"
		}
		else if(bgletters.includes(char) && hasbgletters == false){
			sec_level += 20
			hasbgletters = true
			addition  = ", Add numbers to make the password unpredictable"
		}
		else if(numbers.includes(char) && hasnumbers == false){
			sec_level += 20
			hasnumbers = true
			addition  = ", Add symbols to maximize the security of the password"
		}
		else if(symbols.includes(char) && hassymbols == false){
			sec_level += 20
			hassymbols = true
			addition  = ""
		}
	});

    if(password.length > 10){
        sec_level += 20
    }

    if(sec_level>80){
        document.getElementById("input-password").style.borderBottomColor = "#50e62e"
        document.getElementById("password-feedback").innerHTML = "Strong Password"+addition
    }else if(sec_level>60){
        document.getElementById("input-password").style.borderBottomColor = "#bfff47"
        document.getElementById("password-feedback").innerHTML = "Moderately Strong Password"+addition
    }else if(sec_level>40){
        document.getElementById("input-password").style.borderBottomColor = "#fcff47"
        document.getElementById("password-feedback").innerHTML = "Moderate Password"+addition
    }else if(sec_level>20){
        document.getElementById("input-password").style.borderBottomColor = "#ffbf47"
        document.getElementById("password-feedback").innerHTML = "Moderately Weak Password"+addition
    }else if(sec_level>0){
        document.getElementById("input-password").style.borderBottomColor = "#ff4747"
        document.getElementById("password-feedback").innerHTML = "Weak Password"+addition
    }else{
        document.getElementById("input-password").style.borderBottomColor = "#000000"
        document.getElementById("password-feedback").innerHTML = "A strong password must contain letters of different cases, numbers and symbols"
    }
}

document.getElementById("input-password").addEventListener('keypress',(event)=>{
	updateColor()
})

document.getElementById("input-password").addEventListener('change',(event)=>{
	updateColor()
})

document.getElementById("new-record-auto-password").addEventListener('click',(event)=>{
	document.getElementById("input-password").value = generateRandomPassword()
	updateColor()
})

function generateRandomPassword(){
	var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var passwordLength = 20;
	var password = "";
	for (var i = 0; i <= passwordLength; i++){
		var randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber +1);
	}
	return(password)
}