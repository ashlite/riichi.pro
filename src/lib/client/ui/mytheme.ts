import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myTheme: CustomThemeConfig = {
    name: 'myTheme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-primary-50)",
		"--on-secondary": "var(--color-secondary-50)",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ed4909 
		"--color-primary-50": "252 228 218", // #fce4da
		"--color-primary-100": "251 219 206", // #fbdbce
		"--color-primary-200": "251 210 194", // #fbd2c2
		"--color-primary-300": "248 182 157", // #f8b69d
		"--color-primary-400": "242 128 83", // #f28053
		"--color-primary-500": "237 73 9", // #ed4909
		"--color-primary-600": "213 66 8", // #d54208
		"--color-primary-700": "178 55 7", // #b23707
		"--color-primary-800": "142 44 5", // #8e2c05
		"--color-primary-900": "116 36 4", // #742404
		// secondary | #84cc16 
		"--color-secondary-50": "237 247 220", // #edf7dc
		"--color-secondary-100": "230 245 208", // #e6f5d0
		"--color-secondary-200": "224 242 197", // #e0f2c5
		"--color-secondary-300": "206 235 162", // #ceeba2
		"--color-secondary-400": "169 219 92", // #a9db5c
		"--color-secondary-500": "132 204 22", // #84cc16
		"--color-secondary-600": "119 184 20", // #77b814
		"--color-secondary-700": "99 153 17", // #639911
		"--color-secondary-800": "79 122 13", // #4f7a0d
		"--color-secondary-900": "65 100 11", // #41640b
		// tertiary | #22d3ee 
		"--color-tertiary-50": "222 248 252", // #def8fc
		"--color-tertiary-100": "211 246 252", // #d3f6fc
		"--color-tertiary-200": "200 244 251", // #c8f4fb
		"--color-tertiary-300": "167 237 248", // #a7edf8
		"--color-tertiary-400": "100 224 243", // #64e0f3
		"--color-tertiary-500": "34 211 238", // #22d3ee
		"--color-tertiary-600": "31 190 214", // #1fbed6
		"--color-tertiary-700": "26 158 179", // #1a9eb3
		"--color-tertiary-800": "20 127 143", // #147f8f
		"--color-tertiary-900": "17 103 117", // #116775
		// success | #1fb76c 
		"--color-success-50": "221 244 233", // #ddf4e9
		"--color-success-100": "210 241 226", // #d2f1e2
		"--color-success-200": "199 237 218", // #c7edda
		"--color-success-300": "165 226 196", // #a5e2c4
		"--color-success-400": "98 205 152", // #62cd98
		"--color-success-500": "31 183 108", // #1fb76c
		"--color-success-600": "28 165 97", // #1ca561
		"--color-success-700": "23 137 81", // #178951
		"--color-success-800": "19 110 65", // #136e41
		"--color-success-900": "15 90 53", // #0f5a35
		// warning | #fcd34d 
		"--color-warning-50": "255 248 228", // #fff8e4
		"--color-warning-100": "254 246 219", // #fef6db
		"--color-warning-200": "254 244 211", // #fef4d3
		"--color-warning-300": "254 237 184", // #feedb8
		"--color-warning-400": "253 224 130", // #fde082
		"--color-warning-500": "252 211 77", // #fcd34d
		"--color-warning-600": "227 190 69", // #e3be45
		"--color-warning-700": "189 158 58", // #bd9e3a
		"--color-warning-800": "151 127 46", // #977f2e
		"--color-warning-900": "123 103 38", // #7b6726
		// error | #f16a6a 
		"--color-error-50": "253 233 233", // #fde9e9
		"--color-error-100": "252 225 225", // #fce1e1
		"--color-error-200": "252 218 218", // #fcdada
		"--color-error-300": "249 195 195", // #f9c3c3
		"--color-error-400": "245 151 151", // #f59797
		"--color-error-500": "241 106 106", // #f16a6a
		"--color-error-600": "217 95 95", // #d95f5f
		"--color-error-700": "181 80 80", // #b55050
		"--color-error-800": "145 64 64", // #914040
		"--color-error-900": "118 52 52", // #763434
		// surface | #2b2a41 
		"--color-surface-50": "223 223 227", // #dfdfe3
		"--color-surface-100": "213 212 217", // #d5d4d9
		"--color-surface-200": "202 202 208", // #cacad0
		"--color-surface-300": "170 170 179", // #aaaab3
		"--color-surface-400": "107 106 122", // #6b6a7a
		"--color-surface-500": "43 42 65", // #2b2a41
		"--color-surface-600": "39 38 59", // #27263b
		"--color-surface-700": "32 32 49", // #202031
		"--color-surface-800": "26 25 39", // #1a1927
		"--color-surface-900": "21 21 32", // #151520
		
	}
}