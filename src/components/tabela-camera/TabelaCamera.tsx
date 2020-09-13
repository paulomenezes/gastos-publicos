import React from 'react';

export default function TabelaCamera() {
  return (
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
            <td className="font-bold">Total dos 513 deputados anualmente</td>
            <td className="px-4">R$</td>
            <td className="text-right">1.172.687.958,72</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
