import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import style from './App.module.css';
import storage from './storage';

export default function App() {
	const [page, setPage] = useState(1);

	const [greetingData, setGreetingData] = useState([]);
	const [postData, setPostData] = useState([]);

	const [selectedHello, setSelectedHello] = useState('');
	const [search, setSearch] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newLanguage, setNewLanguage] = useState('');
	const [newGreeting, setNewGreeting] = useState('');

	const [loadingGreeting, setLoadingGreeting] = useState(true);
	const [loadingErrorGreeting, setLoadingErrorGreeting] = useState(true);
	const [loadingPost, setLoadingPost] = useState(true);
	const [alreadyFetch, setAlreadyFetch] = useState(true);
	const [isLogin, setIsLogin] = useState(false);

	const fetchData = () => {
		setLoadingPost(true);
		fetch('/api')
			.then((res) => res.json())
			.then((data) => {
				setPostData(data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoadingPost(false));
	};

	const fetchErrorGreeting = () => {
		setLoadingErrorGreeting(true);
		fetch('/hello', {
			method: 'GET',
		})
			.then((res) => res.json())
			.catch((err) => console.log(err))
			.finally(() => setLoadingErrorGreeting(false));
	};

	const fetchGreeting = () => {
		setLoadingGreeting(true);
		fetch('/hello', {
			method: 'GET',
			headers: { 'User-Id': 'ifabula', Scope: 'user' },
		})
			.then((res) => res.json())
			.then((data) => {
				setGreetingData(data.data);
				setSelectedHello(
					`${data.data[0].text} ${storage.get('username', 'Anonymous')} - ${data.data[0].lang}`
				);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoadingGreeting(false));
	};

	const handleAddNewLanguage = () => {
		if (newLanguage != '' && newGreeting != '') {
			fetch('/hello', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'User-Id': 'ifabula', Scope: 'user' },
				body: JSON.stringify({
					lang: newLanguage,
					text: newGreeting,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setGreetingData([...greetingData, data.data]);
					alert(`${newGreeting} from ${newLanguage} has been added`);
					setNewLanguage('');
					setNewGreeting('');
				})
				.catch((err) => console.log(err));
		} else {
			alert('Please input new language and greeting');
		}
	};

	const handleChangeHello = () => {
		const randomNumber = Math.floor(Math.random() * greetingData.length);
		const randomHello = `${greetingData[randomNumber].text} ${storage.get(
			'username',
			'Anonymous'
		)} - ${greetingData[randomNumber].lang}`;
		setSelectedHello(randomHello);
	};

	const handleHashing = () => {
		const hash = CryptoJS.SHA256('07122023saidpriaifabula').toString(CryptoJS.enc.Hex);
		alert('Hashing result is shown in console.');
		console.log('Hashing 07122023saidpriaifabula: ', hash);
	};

	const handlePrevious = () => {
		setPage(page - 1);
	};

	const handleNext = () => {
		setPage(page + 1);
	};

	const handleDelete = (id) => () => {
		setPostData(postData.filter((post) => post.id !== id));
	};

	const handleLogin = () => {
		if (username != '' && password != '') {
			storage.set('isLogin', true);
			storage.set('username', username);
			storage.set('password', password);
			setUsername('');
			setPassword('');
			setIsLogin(true);
		} else {
			alert('Please input username and password');
		}
	};

	const handleLogout = () => {
		storage.clear();
		setIsLogin(false);
	};

	useEffect(() => {
		const flagLogin = storage.get('isLogin', false);
		setIsLogin(flagLogin);
		if (flagLogin && alreadyFetch) {
			setAlreadyFetch(false);
			fetchErrorGreeting();
			fetchGreeting();
			fetchData();
		}
	}, [isLogin]);

	return (
		<>
			<div className={style.container}>
				<div className={style.wrapper}>
					{!isLogin ? (
						<div className={style.login}>
							<span className={style.loginTitle}>Please Login First to Continue !</span>
							<div className={style.loginBody}>
								<div className={style.loginBodyInput}>
									<label className={style.loginBodyInputLabel}>Username</label>
									<input
										className={style.loginBodyInputField}
										type="text"
										placeholder="Input your username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div className={style.loginBodyInput}>
									<label className={style.loginBodyInputLabel}>Password</label>
									<input
										className={style.loginBodyInputField}
										type="password"
										placeholder="Input your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<button className={style.buttonLogin} onClick={handleLogin}>
									Login
								</button>
							</div>
						</div>
					) : loadingGreeting || loadingErrorGreeting || loadingPost ? (
						<LoopCircleLoading color="black" />
					) : (
						<div className={style.content}>
							<div className={style.contentHeader}>
								<span className={style.hello}>{selectedHello}</span>
								<div className={style.contentHeaderButton}>
									<button className={style.buttonLogout} onClick={handleLogout}>
										Logout
									</button>
									<button className={style.button} onClick={handleChangeHello}>
										Change Hello
									</button>
									<button className={style.button} onClick={handleHashing}>
										Hashing 07122023saidpriaifabula
									</button>
								</div>
							</div>
							<div className={style.postContainer}>
								<span>
									<b>Add New Language</b>
								</span>
								<div className={style.postInputContainer}>
									<input
										type="text"
										className={style.input}
										placeholder="Input new language"
										onChange={(e) => {
											setNewLanguage(e.target.value);
										}}
										value={newLanguage}
									/>
									<input
										type="text"
										className={style.input}
										placeholder="Input new greeting"
										onChange={(e) => {
											setNewGreeting(e.target.value);
										}}
										value={newGreeting}
									/>
								</div>
								<button className={style.buttonAdd} onClick={handleAddNewLanguage}>
									Add New Greeting
								</button>
							</div>
							<div className={style.contentTableContainer}>
								<div className={style.contentTableUtils}>
									<button className={style.button} onClick={handlePrevious} disabled={page <= 1}>
										Previous
									</button>
									<button
										className={style.button}
										onClick={handleNext}
										disabled={page >= Math.ceil(postData.length / 10)}>
										Next
									</button>
									<input
										className={style.input}
										type="text"
										placeholder="Search by title..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
								</div>
								<table className={style.contentTable}>
									<thead className={style.contentTableHeader}>
										<tr>
											<th className={style.contentTableHeaderCellNo}>No</th>
											<th className={style.contentTableHeaderCellTitle}>Title</th>
											<th className={style.contentTableHeaderCellBody}>Body</th>
											<th className={style.contentTableHeaderCellDelete}>Action</th>
										</tr>
									</thead>
									<tbody className={style.contentTableBody}>
										{postData
											.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
											.slice((page - 1) * 10, page * 10)
											.map((post, index) => (
												<tr key={post.id}>
													<td className={style.contentTableBodyCellNo}>{index + 1}</td>
													<td className={style.contentTableBodyCellTitle}>{post.title}</td>
													<td className={style.contentTableBodyCellBody}>{post.body}</td>
													<td className={style.contentTableBodyCellDelete}>
														<button className={style.buttonDelete} onClick={handleDelete(post.id)}>
															Delete
														</button>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className={style.toolTip}>
				i
				<div className={style.toolTipTextContainer}>
					<span className={style.toolTipText}>
						<b>Ringkasan Frontend Test Grit-AI</b>
						<br></br>
						<br></br>
						<b>1.</b> Struktur array JSON berisikan Selamat datang dalam berbagai bahasa
						<br></br>
						<b>2.</b> Label selamat datang tampil dan tombol Change Hello adalah tombol untuk
						merubah nilainya
						<br></br>
						<b>3.</b> Request URL sudah dibuat dan mencetak hasil dalam table lengkap dengan
						pagination dan search bar
						<br></br>
						<b>4.</b> Table tampil dengan limit 10 data per halaman
						<br></br>
						<b>5.</b> Tombol delete berfungsi untuk menghapus data dari table
						<br></br>
						<b>6.</b> Saya menghapus key userId karena tidak terlalu berguna dan banyak nilai yang
						sama
						<br></br>
						<b>7.</b> Tombol hashing berfungsi untuk menghash string 07122023saidpriaifabula (Juli
						12 2023 - Said - Pria - ifabula)
						<br></br>
						<b>8.</b> Halaman dilengkapi dengan login sebelum mengakses data lengkap dengan
						localStorage untuk menyimpan data login yang dibersihkan setelah logout
						<br></br>
						<b>9.</b> Terdapat dua buah API dengan method{' '}
						<b>
							GET (/hello untuk mendapatkan data kata &quot;selemat datang&quot; dalam berbagai
							bahasa)
						</b>{' '}
						dan{' '}
						<b>POST (/hello untuk menambahkan kata &quot;selamat datang&quot; dalam bahasa baru)</b>
						yang dibuat menggunakan nodejs express
						<br></br>
						<b>10.</b> Terdapat validasi untuk header yang memastikan bahwa User-id wajiblah ifabula
						dan Scope wajiblah user{' '}
						<b>
							(Saya melakukan 2 kali GET, yang pertama yang sesuai dengan header yang diigingkan
							sedangkan yang kedua yang headernya akan gagal. Dapat dilihat di network sebagai
							buktinya)
						</b>
					</span>
				</div>
			</div>
		</>
	);
}
