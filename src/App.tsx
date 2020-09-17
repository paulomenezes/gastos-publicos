import React from 'react';
import { CSVLink } from 'react-csv';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Button, Grid, Paper, Slider } from '@material-ui/core';
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
  const [bp, setBP] = React.useState<number>(35);
  const [people, setPeople] = React.useState<number>(12);
  const [inactive, setInactive] = React.useState<number>(10);
  const [health, setHealth] = React.useState<number>(10);
  const [bpc, setBpc] = React.useState<number>(8);
  const [edu, setEdu] = React.useState<number>(8);

  const handleChangeBP = (event: any, newValue: number | number[]) => {
    let update = newValue as number;
    let diff = bp - update;
    let unit = diff / 6;

    setBP(newValue as number);

    setPeople(people + unit);
    setInactive(inactive + unit);
    setHealth(health + unit);
    setBpc(bpc + unit);
    setEdu(edu + unit);
  };

  const handleChangePeople = (event: any, newValue: number | number[]) => {
    let update = newValue as number;
    let diff = people - update;
    let unit = diff / 6;

    setPeople(newValue as number);

    setBP(bp + unit);
    setInactive(inactive + unit);
    setHealth(health + unit);
    setBpc(bpc + unit);
    setEdu(edu + unit);
  };

  const handleChangeInactive = (event: any, newValue: number | number[]) => {
    let update = newValue as number;
    let diff = inactive - update;
    let unit = diff / 6;

    setInactive(newValue as number);

    setBP(bp + unit);
    setPeople(people + unit);
    setHealth(health + unit);
    setBpc(bpc + unit);
    setEdu(edu + unit);
  };

  const handleChangeHealth = (event: any, newValue: number | number[]) => {
    let update = newValue as number;
    let diff = health - update;
    let unit = diff / 6;

    setHealth(newValue as number);

    setBP(bp + unit);
    setPeople(people + unit);
    setInactive(inactive + unit);
    setBpc(bpc + unit);
    setEdu(edu + unit);
  };

  const handleChangeBpc = (event: any, newValue: number | number[]) => {
    let update = newValue as number;
    let diff = bpc - update;
    let unit = diff / 6;

    setBpc(newValue as number);

    setBP(bp + unit);
    setPeople(people + unit);
    setInactive(inactive + unit);
    setHealth(health + unit);
    setEdu(edu + unit);
  };

  const handleChangeEdu = (event: any, newValue: number | number[]) => {
    let update = newValue as number;
    let diff = edu - update;
    let unit = diff / 6;

    setEdu(newValue as number);

    setBP(bp + unit);
    setPeople(people + unit);
    setInactive(inactive + unit);
    setHealth(health + unit);
    setBpc(bpc + unit);
  };

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
              <div style={{ paddingLeft: 25, width: 700 }}>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={4}>
                    <p>Benefícios previdenciários</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Slider value={bp} step={10} onChange={handleChangeBP} aria-labelledby="continuous-slider" />
                  </Grid>
                </Grid>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={4}>
                    <p>Pessoal</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Slider value={people} onChange={handleChangePeople} aria-labelledby="continuous-slider" />
                  </Grid>
                </Grid>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={4}>
                    <p>Inativos</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Slider value={inactive} onChange={handleChangeInactive} aria-labelledby="continuous-slider" />
                  </Grid>
                </Grid>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={4}>
                    <p>Saúde</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Slider value={health} onChange={handleChangeHealth} aria-labelledby="continuous-slider" />
                  </Grid>
                </Grid>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={4}>
                    <p>BPC</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Slider value={bpc} onChange={handleChangeBpc} aria-labelledby="continuous-slider" />
                  </Grid>
                </Grid>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={4}>
                    <p>Educação</p>
                  </Grid>
                  <Grid item xs={8}>
                    <Slider value={edu} onChange={handleChangeEdu} aria-labelledby="continuous-slider" />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Paper>

      </div>
      </Grid>
    </div>
  );
}

export default App;
