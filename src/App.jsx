/* eslint-disable react/no-unknown-property */
import './App.css';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import { SphereEnv } from './components/sphereEnv';
import { Landscape } from './components/landscape';


export default function App() {
	return (
		<>
			{/* Фон сцены */}
			<SphereEnv />
			{/* Карта */}
			<Environment background={false} files={"assets/textures/envmap.hdr"} />
			{/* Камера по умолчанию  */}
			<PerspectiveCamera makeDefault position={[0, 10, 10]} />
			{/* Набор элементов управления */}
			<OrbitControls target={[0, 0, 0]} />

			{/* Ландшафт */}
			<Landscape />
			

			{/* Направления света */}
			<directionalLight
				castShadow
				color={"#f3d29a"}
				intensity={2}
				position={[10, 5, 4]}
				shadow-bias={-0.0005}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={0.01}
				shadow-camera-far={20}
				shadow-camera-top={6}
				shadow-camera-bottom={-6}
				shadow-camera-left={-6.2}
				shadow-camera-right={6.4}
			/>

		</>
	);
}

