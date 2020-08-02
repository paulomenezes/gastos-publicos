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
        <p className="text-justify">
          "O Brasil tem os políticos mais caros do mundo”. Essa é uma assertiva
          bastante ouvida e estimulada em todo país, porém, sendo o primeiro
          lugar ou não, não é segredo que o Brasil é um dos países que mais
          gasta o dinheiro público com os próprios políticos. Essa realidade é
          ratificada quando se observa que os parlamentares têm direitos quase
          que infinitos: auxilio casa, auxilio combustível, auxilio alimentação,
          auxilio comunicação entre outros, esses auxílios claro, somados aos
          salários fixos e individuais de cada parlamentar. Lamentavelmente
          essas modormias parlamentares custam custam aos cofres públicos:
        </p>

        <br />

        <div className="flex justify-around">
          <div>
            <h2 className="text-xl">Despesa por parlamentar</h2>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>Salário: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">33.763,00</td>
                </tr>
                <tr>
                  <td>Cota: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">45.612,53</td>
                </tr>
                <tr>
                  <td>Verba para até 25 funcionários: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">106.866,59</td>
                </tr>
                <tr>
                  <td>Auxílio-moradia: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">4.253,00</td>
                </tr>
                <tr className="border-t">
                  <td className="font-bold">Total por deputado</td>
                  <td className="px-4">R$</td>
                  <td className="text-right">190.495,12</td>
                </tr>
                <tr className="border-t">
                  <td className="font-bold">Total por deputado anualmente</td>
                  <td className="px-4">R$</td>
                  <td className="text-right">2.285.941,44</td>
                </tr>
                <tr className="border-t">
                  <td className="font-bold">
                    Total dos 513 deputados anualmente
                  </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">1.172.687.958,72</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl">Despesa por senador</h2>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>Salário: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">33.763,00</td>
                </tr>
                <tr>
                  <td>Cota: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">45.000,00</td>
                </tr>
                <tr>
                  <td>Verba para até 25 funcionários: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">82.000,00</td>
                </tr>
                <tr>
                  <td>Auxílio-moradia: </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">5.500,00</td>
                </tr>
                <tr className="border-t">
                  <td className="font-bold">Total por senador</td>
                  <td className="px-4">R$</td>
                  <td className="text-right">166.263,00</td>
                </tr>
                <tr className="border-t">
                  <td className="font-bold">Total por senador anualmente</td>
                  <td className="px-4">R$</td>
                  <td className="text-right">1.995.156,00</td>
                </tr>
                <tr className="border-t">
                  <td className="font-bold">
                    Total dos 81 senadores anualmente
                  </td>
                  <td className="px-4">R$</td>
                  <td className="text-right">161.607.636,00</td>
                </tr>
              </tbody>
            </table>
          </div>
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
  );
}

export default App;
