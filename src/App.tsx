import React from 'react';
import { CotaParlamentar } from './components/cota/CotaParlamentar';
import { CategoriaDespesa } from './components/categoria/CategoriaDespesas';

function App() {
  return (
    <div className="container mx-auto">
      <header className="font-bold text-2xl mt-4 border-b">
        Gastos Públicos
      </header>

      <div className="mt-2">
        <p className="mb-4">
          Gastos com a cota parlamentar de 2009 até 2020.
          <span className="text-xs">
            (Os gastos de 2020 são referentes até o mês de Junho)
          </span>
        </p>

        <CotaParlamentar />

        <p>Essas despesas são distribuídas nas seguintes categorias:</p>

        <CategoriaDespesa />
      </div>
    </div>
  );
}

export default App;
