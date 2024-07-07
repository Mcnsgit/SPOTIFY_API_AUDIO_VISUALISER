import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve:{
		alias:{
			'global': '/src/global.js',
			'three': 'three'
		},
	},
	define:{
		'global': {}
	},
	server: {
		host: "localhost", 
		port: 3000
	},
	assetsInclude: ["**/*.mp3", "**/*.mp4", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg", "**/*.webp"],
});
