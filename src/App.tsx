import { useState } from 'react';
import './App.css';

const files = {
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: '@react-svg',
        },
        {
          name: '@uploadthing',
        },
        {
          name: '@stripe-webhooks',
        },
      ],
    },
    {
      name: 'app',
      children: [
        {
          name: '(auth)',
          children: [
            {
              name: 'signUp.ts',
            },
            {
              name: 'signIn.ts',
            },
          ],
        },
        {
          name: '(dashboard)',
          children: [
            {
              name: 'Feed.ts',
            },
            {
              name: 'Home.ts',
            },
          ],
        },
      ],
    },
    {
      name: 'api',
      children: [
        {
          name: 'tweet.ts',
        },
        {
          name: 'tweetProfile.ts',
        },
      ],
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

function Entry({ entry, depth }: { entry: TEntry; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='entryDiv'>
      {entry.children ? (
        <button className='entry' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '- ' : '+ '}
          {entry.name}
        </button>
      ) : (
        <div>{entry.name}</div>
      )}
      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <div className='App'>
        <div style={{ fontSize: '30px' }}>
          React Tree Structure in Typescript
        </div>
        {files.children.map((entry) => (
          <Entry entry={entry} depth={1} />
        ))}
      </div>
    </>
  );
}

export default App;
