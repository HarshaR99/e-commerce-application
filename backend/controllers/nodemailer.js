const nodemailer = require('nodemailer'); 

const sendDetails = (userEmail) =>{


let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'harsha.cs18@bmsce.ac.in', 
		pass: '****'
	} 
}); 

let mailDetails = { 
	from: 'harsha.cs18@bmsce.ac.in', 
	to: userEmail, 
	subject: 'Medical Ecommerce website', 
    text: 'WELCOME TO OUR WEBSITE',
    
}; 

mailTransporter.sendMail(mailDetails, function(err, data) { 
	if(err) { 
		console.log('Error Occurs'); 
	} else { 
		console.log('Email sent successfully'); 
	} 
}); 
}


module.exports = sendDetails;