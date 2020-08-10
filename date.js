
module.exports = getDate;

function getDate(){

	let options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	};
	let day = new Date().toLocaleDateString('en-us', options); 
	return day;
}