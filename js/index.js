window.onload = function(){
	window.level = document.getElementById('level').value;
	window.time = document.getElementById('time').value;
	var grade = 0;
	var rate = '0%';
	var completed = 0;
	var startButton = document.getElementById('startButton');
	var sureButton = document.getElementById('sureButton');
	var blocks = document.getElementsByClassName('block');
	var status = new Array(blocks.length);

	startButton.addEventListener('click', gameStart);
	sureButton.addEventListener('click', convey);
	$('#settingList').on('hidden.bs.modal',convey);

//游戏开始函数
	function gameStart(){
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].addEventListener('click',beatMouse);
		}
		countdown();
	}

//id数组
	for (var i = 0; i < blocks.length; i++) {
		status[i] = i;
	}

//计时函数（包含游戏过程、结束函数）
	function countdown(){
		document.getElementById('timeup').value = window.time;
		var count = setInterval(function(){
			var timeup = document.getElementById('timeup').value;
			timeup--;
			document.getElementById('timeup').value = timeup;
			if (timeup == 0) {
				clearInterval(count);
				for (var i = 0; i < blocks.length; i++) {
					blocks[i].removeEventListener('click',beatMouse);
				}
				alert("Time up. ");
			}
		},1000);
	}

//设置函数
	function convey(){
		window.level = document.getElementById('level').value;
		window.time = document.getElementById('time').value;
	}

//生成单独的随机数
	function randomize(max){
		return Math.floor(Math.random()*max);
	}

//点击函数
	function beatMouse(){
		if (this.style.backgroundImage != "") {
			var step = parseInt(this.style.backgroundImage.substr(13,1));
			this.style.backgroundImage = "url('css/img/m1.jpg')";
			completed++;
			grade += step;
		}
	}

//统计分数函数
	function countScore(){
		return grade;
	}

//统计命中率函数
	function countRate(){
		var sum = level * time;
		var rate = parseInt(completed*100/sum);
		var result = rate + "%";
		return result;
	}

//生成鼠逻辑函数
	function pointer(){
		var point = new Array(blocks.length);
		for (var i = 0; i < blocks.length; i++) {
			point[i] = i;
		}
		var result = new Array(level);
		for (var i = 0; i < result.length; i++) {
			var j = randomize(point.length);
			result[i] = point[j];
			point.splice(j,1);
		}
		return result;
	}

//出现鼠函数
	function createMouse(targets){
		for (var i = 0; i < targets.length; i++) {
			blocks[targets[i]].style.backgroundImage = selectMouse();
		}
	}

//鼠种类函数
	function selectMouse(){
		var i = randomize(10);
		return "url('css/img/mouse" + i + ".jpg')";
	}
}