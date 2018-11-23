export class AbenteuerTyp {
    name: string;
    kuerzel: string;
    zauber:boolean;
}

export const ABENTEUERTYPEN = {
    'Assassine': {name: 'Assassine', kuerzel: 'As', zauber:false},
    'BarbarNordland': {name: 'Barbar Nordland', kuerzel: 'BN', zauber:false},
    'BarbarSteppe': {name: 'Barbar Steppe', kuerzel: 'BS', zauber:false},
    'BarbarWald': {name: 'Barbar Wald', kuerzel: 'BW', zauber:false},
    'Barde': {name: 'Barde', kuerzel: 'Ba', zauber:false},
    'Gluecksritter': {name: 'Glücksritter', kuerzel: 'Gl', zauber:false},
    'Haendler': {name: 'Händler', kuerzel: 'Hä', zauber:false},
    'Krieger': {name: 'Krieger', kuerzel: 'Kr', zauber:false},
    'Ordenskrieger': {name: 'Ordenskrieger', kuerzel: 'Or', zauber:false},
    'Seefahrer': {name: 'Seefahrer', kuerzel: 'Se', zauber:false},
    'Soeldner': {name: 'Söldner', kuerzel: 'Sö', zauber:false},
    'Spitzbube': {name: 'Spitzbube', kuerzel: 'Sp', zauber:false},
    'Waldlaeufer': {name: 'Waldläufer', kuerzel: 'Wa', zauber:false},
    'Beschwoerer': {name: 'Beschwörer', kuerzel: 'Be', zauber:true},
    'Druide': {name: 'Druide', kuerzel: 'Dr', zauber:true},
    'Heiler': {name: 'Heiler', kuerzel: 'Hl', zauber:true},
    'Hexer': {name: 'Hexer', kuerzel: 'Hx', zauber:true},
    'Magier': {name: 'Magier', kuerzel: 'Ma', zauber:true},
    'PriesterFruchtbarkeit': {name: 'Priester Fruchtbarkeit', kuerzel: 'PF', zauber:true},
    'PriesterHerrschaft': {name: 'Priester Herrschaft', kuerzel: 'PH', zauber:true},
    'PriesterKrieg': {name: 'Priester Krieg', kuerzel: 'PK', zauber:true},
    'PriesterMeer': {name: 'Priester Meer', kuerzel: 'PM', zauber:true},
    'PriesterWeisheit': {name: 'Priester Weisheit', kuerzel: 'PW', zauber:true},
    'PriesterTod': {name: 'Priester Tod', kuerzel: 'PT', zauber:true},
    'Schamane': {name: 'Schamane', kuerzel: 'Sc', zauber:true},
    'Thaumaturg': {name: 'Thaumaturg', kuerzel: 'Th', zauber:true}
};

export const ABENTEUERTYPEN_LIST = [
    ABENTEUERTYPEN.Assassine,
    ABENTEUERTYPEN.BarbarNordland,
    ABENTEUERTYPEN.BarbarSteppe,
    ABENTEUERTYPEN.BarbarWald,
    ABENTEUERTYPEN.Barde,
    ABENTEUERTYPEN.Gluecksritter,
    ABENTEUERTYPEN.Haendler,
    ABENTEUERTYPEN.Krieger,
    ABENTEUERTYPEN.Ordenskrieger,
    ABENTEUERTYPEN.Seefahrer,
    ABENTEUERTYPEN.Soeldner,
    ABENTEUERTYPEN.Spitzbube,
    ABENTEUERTYPEN.Waldlaeufer,
    ABENTEUERTYPEN.Beschwoerer,
    ABENTEUERTYPEN.Druide,
    ABENTEUERTYPEN.Heiler,
    ABENTEUERTYPEN.Hexer,
    ABENTEUERTYPEN.Magier,
    ABENTEUERTYPEN.PriesterFruchtbarkeit,
    ABENTEUERTYPEN.PriesterHerrschaft,
    ABENTEUERTYPEN.PriesterKrieg,
    ABENTEUERTYPEN.PriesterMeer,
    ABENTEUERTYPEN.PriesterWeisheit,
    ABENTEUERTYPEN.PriesterTod,
    ABENTEUERTYPEN.Schamane,
    ABENTEUERTYPEN.Thaumaturg
];