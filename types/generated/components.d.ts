import type { Schema, Struct } from '@strapi/strapi';

export interface ArticuloAutoresDeArticulo extends Struct.ComponentSchema {
  collectionName: 'components_articulo_autores_de_articulos';
  info: {
    displayName: 'Autores_de_articulo';
  };
  attributes: {
    apellido: Schema.Attribute.String;
    primer_nombre: Schema.Attribute.String;
  };
}

export interface AsociacionMiembros extends Struct.ComponentSchema {
  collectionName: 'components_asociacion_miembros';
  info: {
    displayName: 'miembros';
  };
  attributes: {
    Cargo: Schema.Attribute.Enumeration<
      [
        'Presidente',
        'Vicepresidente',
        'Secretario',
        'Tesorero',
        'Vocal',
        'Representante',
      ]
    >;
    curriculum: Schema.Attribute.Text;
    foto: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nombre: Schema.Attribute.String;
    year_estudiante: Schema.Attribute.Enumeration<
      [
        'Primer a\u00F1o',
        'Segundo a\u00F1o',
        'Tercer a\u00F1o',
        'Cuarto a\u00F1o',
        'Quinto a\u00F1o',
      ]
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'articulo.autores-de-articulo': ArticuloAutoresDeArticulo;
      'asociacion.miembros': AsociacionMiembros;
    }
  }
}
