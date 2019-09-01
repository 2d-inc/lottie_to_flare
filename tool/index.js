import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import MonacoEditor from 'react-monaco-editor';
import bind from "bind";
import download from "downloadjs";
import JSZip from "jszip";
import LottieToFlare from "../converter/lottie_to_flare.js";
import assets from "../converter/flare/assets"
import "./style.css";

// const DefaultLottieUrl = "https://assets10.lottiefiles.com/packages/lf20_Vs49OV.json";//"https://assets5.lottiefiles.com/packages/lf20_9wwQRk.json";
const DefaultLottieUrl = "animations/data.json";//"Local json";
const DefaultLottieZip = "animations/animations.zip";//"Local zip";

class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			code: '',
		}
	}

	componentDidMount()
	{
		window.addEventListener("resize", this.onResizeWindow);
		this.downloadLottie(DefaultLottieZip);
	}

	componentWillUnmount()
	{
		window.removeEventListener("resize", this.onResizeWindow);
	}

	@bind
	onResizeWindow(ev)
	{
		const { lottieEditor, flareEditor } = this;
		if (lottieEditor) { lottieEditor.layout(); }
		if (flareEditor) { flareEditor.layout(); }
	}

	@bind
	lottieEditorDidMount(editor, monaco)
	{
		this.lottieEditor = editor;
		editor.focus();
		this.convert();
	}

	@bind
	flareEditorDidMount(editor, monaco)
	{
		this.flareEditor = editor;
		this.convert();
	}

	@bind
	onChange(newValue, e)
	{
		clearTimeout(this.convertTimeout);
		this.convertTimeout = setTimeout(this.convert, 1000);
	}

	@bind
	convert()
	{
		const { lottieEditor, flareEditor } = this;
		if (!lottieEditor || !flareEditor)
		{
			return;
		}
		const lottie = lottieEditor.getValue();

		const converter = new LottieToFlare();
		converter.convert(lottie).then((flareJson) =>
		{
			flareEditor.setValue(JSON.stringify(flareJson, null, 2));
		})
		.catch((err) => {
			//
			console.log(err)
		});
	}

	getLottieContent() {

	}

	downloadLottieJson(url) {
		const req = new XMLHttpRequest();
		// req.responseType = "arraybuffer";
		req.addEventListener("load", () =>
		{
			this.type = 'json';
			let text = null;
			try
			{
				const json = JSON.parse(req.responseText);
				text = JSON.stringify(json, null, 2);
			}
			catch (e)
			{
				alert("Failed to get lottie data.");
				return;
			}


			this.lottieEditor.setValue(text);

		});
		req.open("GET", url);
		req.send();
	}

	downloadLottieZip(url) {
		const req = new XMLHttpRequest();
		req.responseType = "arraybuffer";
		req.addEventListener("load", () =>
		{
			const new_zip = new JSZip();
			new_zip.loadAsync(req.response)
			.then((zip) => {
				this.type = 'zip';
				this.zipObject = new_zip;

				let jsonPath = ''

				this.zipObject.forEach(file => {
					if (file.indexOf('.json') !== -1) {
						jsonPath = file
					}
				})

			    new_zip.file(jsonPath).async("string").then((jsonString) => {

			    	let text = null;
			    	try
			    	{
			    		const json = JSON.parse(jsonString);
			    		text = JSON.stringify(json, null, 2);
			    	}
			    	catch (e)
			    	{
			    		this.parseLottieZip(req.responseText)
			    		return;
			    	}

					this.lottieEditor.setValue(text);
			    }) // a promise of "Hello World\n"
			});

		});
		req.open("GET", url);
		req.send();
	}

	downloadLottie(url)
	{
		if (url.indexOf('.zip') !== -1) {
			this.downloadLottieZip(url)
		} else {
			this.downloadLottieJson(url)
		}
	}

	@bind
	getLottieFromURL()
	{
		const { lottieEditor } = this;
		if (!lottieEditor)
		{
			return;
		}

		const url = prompt("Lottie URL:", DefaultLottieUrl);
		if (!url)
		{
			return;
		}
		this.downloadLottie(url);
	}

	@bind
	async downloadFlare()
	{
		const { flareEditor, lottieEditor } = this;
		if (!flareEditor)
		{
			return;
		}
		const value = flareEditor.getValue();
		const name = "name.flr2d";


		const zip = JSZip();
		zip.file(name, value);
		if (this.type === 'zip') {
			const lottieValue = lottieEditor.getValue();
			const lottieAssets = JSON.parse(lottieValue).assets
			.filter(asset => !!asset.p)
			const asset = lottieAssets[0]
			const assetsData = await Promise.all(lottieAssets.map(asset => this.zipObject.file(`${asset.u}${asset.p}`).async('arraybuffer')))
			lottieAssets.forEach((asset, index) => {
				zip.file(asset.id, assetsData[index]);
			})
		}

		// await Promise.all()
		zip.generateAsync({ type: "blob" }).then(function (content)
		{
			download(content, name, "application/octet-stream");
		});
	}

	render()
	{
		const code = this.state.code;
		const options = {
			selectOnLineNumbers: true
		};
		return (
			<div className="panels">
				<div className="codePanel">
					<div className="codeHeader"><span>Lottie JSON</span><div onClick={this.getLottieFromURL}>From URL</div></div>
					<MonacoEditor
						ref={this.setLottieCode}
						width="100%"
						height="100%"
						language="json"
						theme="vs-dark"
						value={code}
						options={{ selectOnLineNumbers: true }}
						onChange={this.onChange}
						editorDidMount={this.lottieEditorDidMount} />
				</div>
				<div className="codePanel">
					<div className="codeHeader"><span>Flare JSON</span><div onClick={this.downloadFlare}>Download</div></div>
					<MonacoEditor
						ref={this.setFlareCode}
						width="100%"
						height="100%"
						language="json"
						theme="vs-dark"
						options={{
							selectOnLineNumbers: true,
							readOnly: true
						}}
						editorDidMount={this.flareEditorDidMount} />
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));