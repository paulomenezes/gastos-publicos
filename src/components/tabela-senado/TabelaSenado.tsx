import React from 'react';

export default function TabelaSenado() {
  return (
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
            <td className="font-bold">Total dos 81 senadores anualmente</td>
            <td className="px-4">R$</td>
            <td className="text-right">161.607.636,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
