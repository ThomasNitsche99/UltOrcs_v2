const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			colors: {
				'reg-blue': '#1f6266',
				'tuborg_green': '#368015'
			},
			backgroundImage: {
				poker: "url('/images/bg_crop.jpg')"
			}
		},
		container: {
			center: true, 
			padding: '15rem',
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
