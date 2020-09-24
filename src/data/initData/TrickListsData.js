import Trick from '../classes/Trick';
import TrickList from '../classes/TrickList';

const trickLists = [
    new TrickList(
      [ 
        new Trick('cab 2 on', 'rails'),
        new Trick('front 3 out', 'rails'),
        new Trick('front 1 out', 'rails')
      ],
      'rails',
      'Leetos rails'
    ),
    new TrickList(
      [ 
        new Trick('cab 5', 'jumps'),
        new Trick('front 5', 'jumps'),
        new Trick('back 7', 'jumps')
      ],
      'jumps',
      'Jets Jumps'
    ),
    new TrickList(
      [ 
        new Trick('cab 1 on', 'rails'),
        new Trick('front 1 on', 'rails'),
        new Trick('fb 4', 'rails'),
        new Trick('cab 2 on', 'rails'),
        new Trick('front 3 on', 'rails'),
        new Trick('front 3 out', 'rails'),
        new Trick('cab 3 out', 'rails'),
        new Trick('front 4 on', 'rails'),
        new Trick('board 2', 'rails')
      ],
      'rails',
      'Elis rails'
    )
]

export default trickLists;