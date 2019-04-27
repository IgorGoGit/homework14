let age = document.getElementById('age');
function showUser(surname, name, inputAge) {
	alert("Пользователь " + surname + " " + name + ", его возраст " + inputAge.value);
}
showUser('Smith', 'John', age);



