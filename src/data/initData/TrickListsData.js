import Trick from '../classes/Trick';
import TrickList from '../classes/TrickList';

const trickLists = [
    new TrickList(
      [ 
        new Trick('cab 1 on', 'rails'),
        new Trick('backboard', 'rails'),
        new Trick('front 1 out', 'rails')
      ],
      'rails',
      'Easy rails'
    ),
    new TrickList(
      [ 
        new Trick('cab 3', 'jumps'),
        new Trick('front 3', 'jumps'),
        new Trick('back 180', 'jumps')
      ],
      'jumps',
      'Easy Jumps'
    ),
    new TrickList(
      [ 
        new Trick('cab 2 on', 'rails'),
        new Trick('front 1 on', 'rails'),
        new Trick('front blunt 4', 'rails'),
        new Trick('cab 3 on', 'rails'),
        new Trick('front 3 on', 'rails'),
        new Trick('front 3 out', 'rails'),
        new Trick('cab 3 out', 'rails'),
        new Trick('front 2 on', 'rails'),
        new Trick('board 2', 'rails')
      ],
      'rails',
      'Hard rails'
    )
]

export default trickLists;