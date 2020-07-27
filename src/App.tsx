import React from 'react';
import { CotaParlamentar } from './components/cota/CotaParlamentar';
import { CategoriaDespesaCamera } from './components/categoria-camera/CategoriaDespesasCamera';
import { CategoriaDespesaSenado } from './components/categoria-senado/CategoriaDespesasSenado';

function App() {
  return (
    <div className="container mx-auto">
      <header className="font-bold text-2xl mt-4 border-b">
        Gastos Públicos
      </header>

      <div className="mt-2">
        <p className="mb-4">
          Gastos com a cota dos deputados e dos senadores de 2009 até 2020.
          <span className="text-xs">
            (Os gastos de 2020 são referentes até o mês de Junho)
          </span>
        </p>

        <CotaParlamentar />

        <p>
          As despesas dos deputados são distribuídas nas seguintes categorias:
        </p>

        <CategoriaDespesaCamera />

        <p>
          Enquanto as dos senadores são distribuídas nessas outras categorias:
        </p>

        <CategoriaDespesaSenado />
      </div>
    </div>
  );
}

export default App;
