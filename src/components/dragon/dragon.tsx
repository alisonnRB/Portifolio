import './dragon.css';
import Background from './background';
import Camada5 from './camada5';
import Camada4 from './camada4';
import Castle from './castle';

export default function Dragon() {

    return (
        <div className="h-full w-full relative overflow-hidden">
            {/* fundo */}
            <Background />

            {/* camada5 */}
            <Camada5 />

            {/* camada4 */}
            <Camada4 />

            {/* castle */}
            <Castle />

        </div>
    );
}