/* eslint-disable react/no-unknown-property */
import { useTexture } from '@react-three/drei';
import { BackSide } from 'three';

export function SphereEnv() {
	// Фон нашей сцены
	const map = useTexture('assets/textures/envmap.jpg');

	return (
		<mesh>
			<sphereGeometry args={[60, 50, 50]} />
			{/* Создаёт очущение что мы внутри сферы */}
			<meshBasicMaterial side={BackSide} map={map}/>
		</mesh>
	);
}