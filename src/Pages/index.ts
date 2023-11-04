import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import inicio from "./inicio"
import login from "./login";
import loginUser from "./loginUser";
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
import viajar from "./viajar";

import pasajero from "./pasajero";
import reserva from "./reserva";
import proximamente from "./proximamente";


import conductor from "./conductor";
import vehiculo from './vehiculo';
import tipo_vehiculo from './tipo_vehiculo';
import cliente from './cliente';

import version_required from './version_required';
import notification_manager from './notification_manager';
import test from './test';
export default SPage.combinePages("/", {
  "": carga,
  "root": root,
  inicio,
  requisitos,
  wiki,
  ...login,
  ...loginUser,
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
  ...datos,
  ...viajar,
  ...pasajero,
  ...reserva,
  "proximamente": proximamente,
  ...conductor,
  ...vehiculo,
  ...tipo_vehiculo,
  test,
  ...cliente,
  version_required,
  notification_manager
});
