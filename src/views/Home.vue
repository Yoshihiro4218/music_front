<template>

	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="utf-8">
		<title>MY MUSIC LIST</title>
		<link rel="stylesheet" href="stylesheet.css">
	</head>

	<body>
		<div class="header">
			<div class="header-logo">MY MUSIC LIST</div>
			<div class="header-list">
				<ul>
					<li>○○○○</li>
					<li>練習用</li>
					<li>お問い合わせ</li>
				</ul>
			</div>
		</div>

		<div class="main">
			<div class="copy-container">
				<h1>MY MUSIC LIST<span>＼(^o^)／</span></h1>
				<div>
					<img src="../assets/header.png">
				</div>
				<h2>Java Spring Boot + Vue.jsの練習をします。</h2>
			</div>

			<div>
				<h1>Music List</h1>
				<form name="createMusicForm">
					<p>　　　　　曲名：<input type="text" class="createInput" id="musicName" name="musicName" required></p>
					<p>アーティスト名：<input type="text" class="createInput" id="artistName" name="artistName" required></p>
					<p>　　アルバム名：<input type="text" class="createInput" id="albumName" name="albumName" required></p>
					<p><input type="button" class="createBtn" value="登録する" v-on:click="createMusic()"></p>
				</form>

				<table>
					<thead>
						<tr>
							<th align="center">曲名</th>
							<th align="center">アーティスト名</th>
							<th align="center">アルバム名</th>
							<th align="center">編集</th>
							<th align="center">削除</th>
						</tr>
					</thead>
					<tbody>
						<tr class="musicList" v-for="item of items" v-bind:key="item">
							<td align="left">{{ item.music_name}}</td>
							<td align="left">{{ item.artist_name}}</td>
							<td align="left">{{ item.album_name}}</td>
							<td><button v-on:click="modalOpen(item.id)">編集</button></td>
							<td><button v-on:click="deleteMusic(item.id)">削除</button></td>
						</tr>
					</tbody>
				</table>
			</div>
			<UpdateModal v-if="modal" @close="modalClose" @update="updateMusic">
				<div id="title">
					<h3 style="font-size:30px;">楽曲情報の更新</h3>
					<body class="updateForm">
						<p>　　　　　曲名：<input type="text" class="updateInput" v-model="musicNameUpdate" value="" required></p>
						<p>アーティスト名：<input type="text" class="updateInput" v-model="artistNameUpdate" value="" required></p>
						<p>　　アルバム名：<input type="text" class="updateInput" v-model="albumNameUpdate" value="" required></p>
					</body>
				</div>
			</UpdateModal>

			<div class="contents">
				<h3 class="section-title">学べるレッスン</h3>
				<div class="contents-item">
					<img src="https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/html/study/html.svg">
					<p>HTML & CSS</p>
				</div>
				<div class="contents-item">
					<img src="https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/html/study/php.svg">
					<p>PHP</p>
				</div>
				<div class="contents-item">
					<img src="https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/html/study/ruby.svg">
					<p>Ruby</p>
				</div>
				<div class="contents-item">
					<img src="https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/html/study/swift.svg">
					<p>Swift</p>
				</div>
			</div>

			<div class="contact-form">

			</div>
		</div>

		<div class="footer">
			<div class="footer-logo">MY MUSIC LIST</div>
			<div class="footer-list">
				<ul>
					<li>○○○○</li>
					<li>テスト</li>
					<li>お問い合わせ</li>
				</ul>
			</div>
		</div>
	</body>

	</html>

</template>


<script>
	import axios from 'axios'
	import UpdateModal from "../components/UpdateModal"

	export default {
		name: 'musicListGet',
		data() {
			return {
				items: [],
				musicDetail: [],
				modal: false,
				musicNameUpdate: "",
				artistNameUpdate: "",
				albumNameUpdate: ""
			}
		},
		components: {
			UpdateModal
		},
		mounted() {
			axios
				.get('/musics')
				.then((res) => {
					this.items = res.data
				})
		},
		methods: {
			createMusic() {
				var params = new URLSearchParams();
				params.append('musicName', document.forms.createMusicForm.musicName.value);
				params.append('artistName', document.forms.createMusicForm.artistName.value);
				params.append('albumName', document.forms.createMusicForm.albumName.value);
				axios.post('/musics', params).then(location.reload());
			},
			deleteMusic(musicId) {
				axios.delete('/musics/' + musicId).then(location.reload());
			},
			modalOpen(musicId) {
				this.modal = true				
				axios.get('/musics/' + musicId).then((res) => {
					this.musicDetail = res.data[0]
					this.musicNameUpdate = this.musicDetail.music_name
					this.artistNameUpdate = this.musicDetail.artist_name
					this.albumNameUpdate = this.musicDetail.album_name
					})
			},
			modalClose() {
				this.musicDetail.length = 0
				this.musicNameUpdate = ""
				this.artistNameUpdate = ""
				this.albumNameUpdate = ""
     		this.modal = false
			},
			updateMusic(){
				var params = new URLSearchParams();
				params.append('musicName', this.musicNameUpdate);
				params.append('artistName', this.artistNameUpdate);
				params.append('albumName', this.albumNameUpdate);
				axios.put('/musics/' + this.musicDetail.id, params).then(location.reload());
			},
		}
	}
</script>

<style>
	body {
		font-family: "Avenir Next";
	}

	li {
		list-style: none;
	}

	.header {
		background-color: #e28bf8;
		color: #fff;
		height: 90px;
	}

	.header-logo {
		float: left;
		font-size: 36px;
		padding: 20px 40px;
	}

	.header-list li {
		float: left;
		padding: 33px 20px;
	}

	.main {
		padding: 100px 80px;
		background-color: rgb(248, 255, 247);

	}

	table {
		border-collapse: collapse;
		border: solid 2px black;
		/*表全体を線で囲う*/
	}

	table th {
		border: dashed 1px black;
		/**/
		padding: 5px;
		/*破線 1px オレンジ*/
	}

	table td {
		border: dashed 1px black;
		/**/
		padding: 1px 10px 1px 5px;
		/*破線 1px オレンジ*/
	}

	.copy-container h1 {
		font-size: 140px;
	}

	.copy-container h2 {
		font-size: 60px;
	}

	.copy-container span {
		color: #e99d9d;
	}

	.contents {
		height: 500px;
		/* margin-topを100pxにしてください */
		margin-top: 100px;

	}

	.section-title {
		border-bottom: 3px solid rgb(179, 177, 177);
		/* font-sizeを28pxにしてください */
		font-size: 28px;

		/* padding-bottomを15pxにしてください */
		padding-bottom: 15px;

		/* margin-bottomを50pxにしてください */
		margin-bottom: 50px;

	}

	.musicList {
		margin: auto;
	}

	.contents-item {
		float: left;
		/* margin-rightを40pxにしてください */
		margin-right: 40px;

	}

	/* contents-itemの中のp要素のfont-size、margin-topを指定してください */
	.contents-item p {
		font-size: 24px;
		margin-top: 30px;
	}

	.footer {
		background-color: #e28bf8;
		color: #fff;
		height: 120px;
		padding: 40px;
	}

	.footer-logo {
		float: left;
		font-size: 32px;
	}

	.footer-list {
		float: right;
	}

	.footer-list li {
		padding-bottom: 20px;
	}

	.createBtn{
		font-size: 30px;
		margin: 10px 0px 30px 100px;
	}

	.createInput,
	.updateInput{
		width: 250px;
	}

	/* .updateForm{
		font-size: 20px;
	} */
	
</style>