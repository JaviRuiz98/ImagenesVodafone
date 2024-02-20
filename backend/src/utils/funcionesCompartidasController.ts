
export function parseBool(value: string): boolean {
    const value_bool = value == 'true';
    return value_bool;
  }
  
export function agruparDadoMismoId(array: any[], caracteristica_comun: string) {
    return array.reduce((acc, obj) => {
      if (!acc[obj[caracteristica_comun]]) {
        acc[obj[caracteristica_comun]] = [];
      }
      acc[obj[caracteristica_comun]].push(obj);
      return acc;
    }, {});
  }