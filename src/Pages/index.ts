import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import login from "./login";
import registro from './registro';
import sql from './sql/index';
import privacidad from './privacidad';
import perfil from './perfil';

import rol from './rol';
import usuario from './usuario';
import ajustes from './ajustes';
import wiki from './wiki';
import mapa from './mapa';
import reportes from './reportes';

import ruta from './ruta';
import info from './info';
import datos from './datos';
import publicacion from './publicacion';
import requisitos from './requisitos';

export default SPage.combinePages("/", {
  "": carga,
  "root": root,
  requisitos,
  wiki,
  ...login,
  ...registro,
  sql,
  "privacidad": privacidad,
  "privacy": privacidad,
  ...usuario,
  ...perfil,
  ...rol,
  ...ajustes,
  ...mapa,
  ...reportes,
  ...info,
  ...ruta,
  ...publicacion,
  ...datos
});
