export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  variedade?: string[];
  imagem: string;
  imagensVariedade?: Record<string, string>;
  sazonal?: string[];
}

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Bolo",
    categoria: "Confeitaria",
    preco: 45.0,
    variedade: ["Chocolate", "Morango"],
    imagem: "assets/produtos/bolochocolate.png",
    imagensVariedade: {
      Chocolate: "assets/produtos/bolochocolate.png",
      Morango: "assets/produtos/bolomorango.png",
    },
    sazonal: ["natal", "pascoa", "dia-das-maes"],
  },
  {
    id: 2,
    nome: "Doces Gourmet",
    categoria: "Confeitaria",
    preco: 12.0,
    variedade: ["Brigadeiro", "Beijinho", "Casadinho"],
    imagem: "assets/produtos/doces.png",
    sazonal: ["natal", "pascoa", "dia-das-maes", "festa-junina"],
  },
  {
    id: 3,
    nome: "Muffin",
    categoria: "Confeitaria",
    preco: 8.5,
    imagem: "/assets/produtos/muffinbanana.png",
  },
  {
    id: 4,
    nome: "Brownie",
    categoria: "Confeitaria",
    preco: 10.0,
    imagem: "/assets/produtos/brownie.png",
    sazonal: ["natal", "pascoa"],
  },
  {
    id: 5,
    nome: "Capuccino",
    categoria: "Bebidas",
    preco: 14.0,
    imagem: "/assets/produtos/capuccino.png",
    sazonal: ["inverno"],
  },
  {
    id: 6,
    nome: "Chocolate Quente",
    categoria: "Bebidas",
    preco: 16.0,
    imagem: "/assets/produtos/chocolatequente.png",
    sazonal: ["inverno", "natal"],
  },
  {
    id: 7,
    nome: "Cuca de Doce de Leite",
    categoria: "Confeitaria",
    preco: 18.0,
    imagem: "/assets/produtos/cucadocedeleite.png",
    sazonal: ["inverno", "natal", "festa-junina"],
  },
  {
    id: 8,
    nome: "Mocaccino",
    categoria: "Bebidas",
    preco: 15.0,
    imagem: "/assets/produtos/mocaccino.png",
    sazonal: ["inverno"],
  },
  {
    id: 9,
    nome: "Café Expresso",
    categoria: "Bebidas",
    preco: 7.0,
    imagem: "assets/produtos/cafeexpresso.png",
    sazonal: ["inverno"],
  },
];
