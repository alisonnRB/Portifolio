import './dragon.css';
import Background from './background';
import Camada5 from './camada5';

export default function Dragon() {

    return (
        <div className="h-full w-full relative overflow-hidden">
            {/* fundo */}
            <Background />

            {/* camada5 */}
            <Camada5 />

        </div>
    );
}