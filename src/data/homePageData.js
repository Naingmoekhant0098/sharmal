import Hotel from '../assets/icons/icons/hotel.png';
import Mini from '../assets/icons/icons/mini.png';
import CondoIcon from '../assets/icons/icons/KonDo.png';
import GoDaung from '../assets/icons/icons/godaung.png';
import loneChinEain from '../assets/icons/icons/loneChinEain.png';
import Myaykwat from '../assets/icons/icons/myaykwat.png';
import SainKhan from '../assets/icons/icons/sainKhan.png';
import tikeKhan from '../assets/icons/icons/tikeKhan.png';
import Office from '../assets/icons/icons/yoneKhan.png';


import Yangon from '../assets/images/Yangon.png';
import Mandalay from '../assets/images/Mandalay.png';
import Naypitaw from '../assets/images/Naypitaw.png';
import Paekuu from '../assets/images/Paekuu.png';
import Ayeyawaddy from '../assets/images/Ayeyawaddy.png'

import ToyotaIcon from '../assets/icons/ToyotaIcon.png'
import LexusIcon from '../assets/icons/LexusIcon.png'
import HyndaiIcon from '../assets/icons/HyndaiIcon.png'
import MercedesIcon from '../assets/icons/MercedesIcon.png'
import HondaIcon from '../assets/icons/HondaIcon.png'
import NissaIcon from '../assets/icons/NissaIcon.png'
import FordIcon from '../assets/icons/FordIcon.png'


const PropertyCatagory = [
  {
    "src": loneChinEain,
    "label": "wholeHouse",
    "value" : "လုံးချင်းအိမ်",
  },
  {
    "src":  tikeKhan,
    "label": "apartment",
     "value" : "တိုက်ခန်း"
  },
  {
    "src": CondoIcon,
    "label": "condo",
      "value" : "ကွန်ဒို"
  },
 
  
  {
    "src": Mini,
    "label": "minicondo",
     "value" : "မီနီကွန်ဒို"
  },
  {
    "src":  SainKhan,
    "label": "shop",
    "value" : "ဆိုင်ခန်း"
  },
  {
    "src":  Office,
    "label": "office",
     "value" : "ရုံးခန်း"
  },
  {
    "src":  Myaykwat,
    "label": "land",
    "value" : "မြေကွက်"
  },


  {
    "src": Hotel,
    "label": "hotel",
    "value" : "ဟိုတည်"
  },
  {
    "src": GoDaung,
    "label": "goDaung",
      "value" : "ဂိုဒေါင်"
  },
 

 
 
  
  
  
]

const PropertyByTownship = [
  {
    name: 'naypyitaw',
    image: Naypitaw,
    data: 'နေပြည်တော်'
  },
  {
    name: 'yangon',
    image: Yangon,
    data: 'ရန်ကုန်တိုင်းဒေသကြီး'

  },
  {
    name: 'mandalay',
    image: Mandalay,
    data: 'မန္တလေးတိုင်းဒေသကြီး'

  },
  {
    name: 'ayay',
    image: Ayeyawaddy,
    data: 'ဧရာဝတီတိုင်းဒေသကြီး'

  },
  {
    name: 'paekuu',
    image: Paekuu,
    data: 'ပဲခူးတိုင်းဒေသကြီး'

  }
]

const CarCatagory = [
  {
    "src" : ToyotaIcon,
    "label": "toyota"
  },
  {
    "src" : LexusIcon,
    "label": "lexus"
  },
  {
    "src" : HyndaiIcon,
    "label": "hyundai"
  },
  {
    "src" : MercedesIcon,
    "label": "mercedes"
  },
  {
    "src" : HondaIcon,
    "label": "honda"
  },
  {
    "src" : NissaIcon,
    "label": "nissan"
  },
  {
    "src" : FordIcon,
    "label": "ford"
  }
]

export  {PropertyCatagory, PropertyByTownship, CarCatagory};
