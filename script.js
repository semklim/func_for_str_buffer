'use strict'

console.log(
	"%cCall the bf() function to work with a string buffer\
	\nCall the help() function to see instruction",
	"color: darkblue; font-size: 16px"
);

function help(){
	console.log(
		"%c%s%c%s%c%s%c%s",
		"color: red; font-size: 18px; font-weight: bold;",
		"\nOnly if you type bf() in the DevTool console will you see the magic",
		
		"color: darkblue; font-size: 14px",
		"\n\nYou can try the command, one of these:",
		
		"color: red; font-size: 14px",
		"\n\n(don`t forget to use '' for command)",
		
		"color: darkblue; font-size: 14px",
		"\n\n1)'add' (data1 type must be a string);\
		\n\tTo add new data;\
		\n\n2)'get' (need data1 and data2 like a number)\
		\n\tTo get collection of symbol;\
		\n\n3)'clear' (don't need data1 and data2);\
		\n\tTo clear string buffer;\
		\n\n4)'history'(don't need data1 and data2);\
		\n\tShows u what u did;\
		\n\n5)'replace' (data1 type must be a string;\
		\n\tReplaces the data in the buffer with the one passed to this command;\
		\n\n6)'showBuffer' (don't need data1 and data2);\
		\n\tShows what you've got;"
		);
}

function counter() {
	let count = 0;
	return () => {
		return count += 1;
	}
}

let buffer = () => {
	let bufferStr = '';
	let history = 'History:\n';
	let countNum = counter();

	return (command, data1, data2) => {
		switch (command) {

			case 'showBuffer':{
				if (!bufferStr ?? false) {
					return `Buffer is empty`;
				}
				history +=`${countNum()}. Cmd: ${command}, return ${bufferStr}\n`;
				return bufferStr;
			}

			case 'add':{
				if ((!data1 ?? false) || typeof(data1) !== 'string') {
					return "Need second parameter, data1 type must be a string";
				}
				
				bufferStr += data1;
				history +=`${countNum()}. Cmd: ${command}, add to buffer ${bufferStr}\n`;
				return bufferStr;
			}

			case 'clear':{
				if (!bufferStr ?? false) {
					return `buffer is clean already`;
				}
				bufferStr = '';
				history += `${countNum()}. Cmd: ${command}, buffer is clear` + '\n';
				return 'Buffer is clean';
			}

			case 'get':{
				if (typeof(data1) === 'number') {
					if (data2 === undefined) {
						let cutStr = bufferStr.slice(data1);
						history += `${countNum()}. Cmd: ${command}, buffer = ${cutStr}` + '\n';
						return cutStr;
					}
				}else{
					return 'type of data1 is not a number. Do your best!';
				}
				if (typeof(data2) !== 'number') {
					return 'type of data2 is not a number. Do your best!';
				}

				let cutStr = bufferStr.slice(data1, data2);
				history += `${countNum()}. Cmd: ${command}, buffer = ${cutStr}` + '\n';
				return cutStr;
			}

			case 'history':{
				if (!history ?? false) {
						return 'history is empty';
				}
				history += `${countNum()}. U called the history` + '\n';
				return console.log(history);
			}

			case 'replace':{
				if (!data1 ?? false) {
					return "Need second parameter, data1 type must be a string";
				}
				bufferStr = `${data1}`;
				history += `${countNum()}. Cmd: ${command}, buffer = ${data1}` + '\n';
				return bufferStr;
			}

			default:
				return "Use cmd: 'add' + 'data1', 'get' + data1 data2, 'clear', 'history', 'replace', 'showBuffer'";
		}
	}
}	

let bf = buffer();


