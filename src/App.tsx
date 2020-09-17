import React from 'react';
import { CSVLink } from 'react-csv';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Button, Grid, Paper } from '@material-ui/core';
import TabelaCamera from './components/tabela-camera/TabelaCamera';
import TabelaSenado from './components/tabela-senado/TabelaSenado';
import { CotaParlamentar } from './components/cota/CotaParlamentar';
import CotaData from './components/cota/data-merge.json';
import { CategoriaDespesaCamera } from './components/categoria-camera/CategoriaDespesasCamera';
import { CategoriaDespesaSenado } from './components/categoria-senado/CategoriaDespesasSenado';
import CamaraData from './components/categoria-camera/data.json';
import SenadoData from './components/categoria-senado/data.json';
import { Sankey } from './components/sankey/Sankey';

function App() {
  return (
    <div style={{ padding: 30 }}>
      <Grid container spacing={3} direction="column">
      <div className="container mx-auto">

        <Paper style={{ margin: '10px 0', padding: 15 }}>
          <Grid container direction='row'>
            <Grid item xs={12} style={{ marginBottom: 15 }}>
              <header className="font-bold text-2xl border-b">
                Gastos Públicos
              </header>
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
            </Grid>
            <Grid item xs style={{ marginRight: 25 }}>
              <TabelaCamera />
            </Grid>
            <Grid item xs>
              <TabelaSenado />
            </Grid>
          </Grid>
        </Paper>

        <Paper style={{ margin: '10px 0', padding: 15 }}>
          <p className="mb-4">
            Gastos com a cota dos deputados e dos senadores de 2009 até 2020.
            <span className="text-xs">
              (Os gastos de 2020 são referentes até o mês de Junho)
            </span>
          </p>
          <CotaParlamentar />
          <CSVLink data={CotaData} filename='cota_parlamentar.csv'>
            <Button variant='contained' size='small' startIcon={<CloudDownloadIcon />}>
              CSV
            </Button>
          </CSVLink>
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', paddingTop: 15 }}>
            <div style={{ flex: 1 }}>
              <p>As despesas dos deputados são distribuídas nas seguintes categorias:</p>
              <CategoriaDespesaCamera />
              <CSVLink data={CamaraData} filename='despesas_camara.csv'>
                <Button variant='contained' size='small' startIcon={<CloudDownloadIcon />}>
                  CSV
                </Button>
              </CSVLink>
            </div>
            <div style={{ flex: 1 }}>
              <p>Enquanto as dos senadores são distribuídas nessas outras categorias:</p>
              <CategoriaDespesaSenado />
              <CSVLink data={SenadoData} filename='despesas_senado.csv'>
                <Button variant='contained' size='small' startIcon={<CloudDownloadIcon />}>
                  CSV
                </Button>
              </CSVLink>
            </div>
          </div>
        </Paper>

        <Paper>
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap' }}>
            <div style={{ flex: 1 }}>
              <Sankey/>
            </div>
          </div>
        </Paper>

      </div>
      </Grid>
    </div>
  );
}

export default App;
