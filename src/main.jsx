import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Canvas shadows>
		<Suspense falback>
			<App />
		</Suspense>
	</Canvas>

)
