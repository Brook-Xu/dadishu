window.onload = function(){
	window.level = document.getElementById('level').value;
	window.time = document.getElementById('time').value;
	var grade = 0;
	var rate = '0%';
	var startButton = document.getElementById('startButton');
	var sureButton = document.getElementById('sureButton');
	var status = new Array(25);
	startButton.addEventListener('click', countdown);
	sureButton.addEventListener('click', convey);
	$('#settingList').on('hidden.bs.modal',convey);

//初始化游戏状态数组
	for (var i = 0; i < 25; i++) {
		status[i] = 0;
	}

//计时函数
	function countdown(){
		document.getElementById('timeup').value = window.time;
		var count = setInterval(function(){
			var timeup = document.getElementById('timeup').value;
			timeup--;
			document.getElementById('timeup').value = timeup;
			if (timeup == 0) {
				clearInterval(count);
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
		return Math.floor(Math.random()*(max + 1));
	}

//点击函数

//统计分数函数

//统计命中率函数

//生成鼠逻辑函数

//出现鼠函数
}