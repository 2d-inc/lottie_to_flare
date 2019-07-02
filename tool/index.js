import React from "react";
import ReactDOM from "react-dom";
import MonacoEditor from 'react-monaco-editor';
import bind from "bind";
import download from "downloadjs";
import JSZip from "jszip";
import LottieToFlare from "../converter/lottie_to_flare.js";
import "./style.css";

const DefaultLottieUrl = "https://assets10.lottiefiles.com/packages/lf20_Vs49OV.json";//"https://assets5.lottiefiles.com/packages/lf20_9wwQRk.json";

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
		this.downloadLottie(DefaultLottieUrl);
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
		});
	}

	downloadLottie(url)
	{
		const req = new XMLHttpRequest();
		req.addEventListener("load", () =>
		{
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
	downloadFlare()
	{
		const { flareEditor } = this;
		if (!flareEditor)
		{
			return;
		}
		const value = flareEditor.getValue();
		const name = "name.flr2d";

		const zip = JSZip();
		zip.file(name, value);
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