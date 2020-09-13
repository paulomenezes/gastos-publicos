import React from 'react';
import { CotaParlamentar } from './components/cota/CotaParlamentar';
import { CategoriaDespesaCamera } from './components/categoria-camera/CategoriaDespesasCamera';
import { CategoriaDespesaSenado } from './components/categoria-senado/CategoriaDespesasSenado';
import TabelaCamera from './components/tabela-camera/TabelaCamera';
import TabelaSenado from './components/tabela-senado/TabelaSenado';
import { Sankey } from './components/sankey/Sankey';

function App() {
  return (
    <div>
      <div className="container mx-auto">
        <header className="font-bold text-2xl mt-4 border-b">
          Gastos Públicos
        </header>

        <div className="mt-2">
          <p className="text-justify">
            "O Brasil tem os políticos mais caros do mundo”. Essa é uma
            assertiva bastante ouvida e estimulada em todo país, porém, sendo o
            primeiro lugar ou não, não é segredo que o Brasil é um dos países
            que mais gasta o dinheiro público com os próprios políticos. Essa
            realidade é ratificada quando se observa que os parlamentares têm
            direitos quase que infinitos: auxilio casa, auxilio combustível,
            auxilio alimentação, auxilio comunicação entre outros, esses
            auxílios claro, somados aos salários fixos e individuais de cada
            parlamentar. Lamentavelmente essas modormias parlamentares custam
            custam aos cofres públicos:
          </p>

          <br />

          <div className="flex justify-around">
            <TabelaCamera />
            <TabelaSenado />
          </div>

          <br />

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
      <Sankey />
    </div>
  );
}

export default App;
