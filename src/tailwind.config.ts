import { TailwindcssConfig } from "./typings/tailwind"
const tailwindcssconfig: TailwindcssConfig = JSON.parse(process.env.TAILWIND_CONFIG)
export default tailwindcssconfig
