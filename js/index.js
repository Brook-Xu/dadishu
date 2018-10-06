window.onload = function(){
	window.level = parseInt(document.getElementById('level').value);
	window.time = parseInt(document.getElementById('time').value);
	var grade = 0;
	var rate = '0%';
	var completed = 0;
	var startButton = document.getElementById('startButton');
	var sureButton = document.getElementById('sureButton');
	var gradeInput = document.getElementById('grade');
	var rateInput = document.getElementById('rate');
	var timeupInput = document.getElementById('timeup');
	var blocks = document.getElementsByClassName('block');
	var sound = document.getElementById('sound');

	startButton.addEventListener('click', gameStart);
	sureButton.addEventListener('click', set);
	$('#settingList').on('hidden.bs.modal',set);

//游戏开始函数
	function gameStart(){
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].addEventListener('click',beatMouse);
		}
		grade = 0;
		rate = '0%';
		gradeInput.value = grade;
		rateInput.value = rate;
		if (!sound.paused) {
			sound.loop = false;
			sound.pause();
			sound.src = "beat.mp3";
		}
		clearAll();
		startButton.removeEventListener('click', gameStart);
		countdown();
	}

//计时函数（包含游戏过程、结束函数）
	function countdown(){
		timeupInput.value = window.time;
		var count = setInterval(function(){
			var timeup = timeupInput.value;
			timeup--;
			timeupInput.value = timeup;
			gradeInput.value = countScore();
			rate = countRate();
			rateInput.value = rate;
			clearAll();
			var points = pointer();
			createMouse(points);
			if (timeup == 0) {
				if (!sound.paused) {
					sound.loop = false;
					sound.pause();
					sound.src = "over.mp3";
					sound.play();
				}
				clearInterval(count);
				for (var i = 0; i < blocks.length; i++) {
					blocks[i].removeEventListener('click',beatMouse);
				}
				alert("Time up. ");
				startButton.addEventListener('click', gameStart);
				clearAll();
			}
		},1000);
	}

//清屏函数
	function clearAll(){
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].style.backgroundImage = "";
		}
	}

//设置函数
	function set(){
		window.level = parseInt(document.getElementById('level').value);
		window.time = parseInt(document.getElementById('time').value);
		console.log(level * time);
	}

//生成单独的随机数
	function randomize(max){
		return Math.floor(Math.random()*max);
	}

//点击函数
	function beatMouse(){
		if (sound.paused) {
			sound.loop = false;
			sound.play();
		}
		if (this.style.backgroundImage != "") {
			var step = parseInt(this.style.backgroundImage.substr(18,1));
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