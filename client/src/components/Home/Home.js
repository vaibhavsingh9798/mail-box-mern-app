import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-300 to-pink-400">
      <header className="text-4xl font-bold mb-8">Welcome to Mailbox</header>
      <main className="text-lg text-center max-w-xl">
        <p>
          A mailbox is a container for receiving incoming mail at a private residence or business. Mailboxes often come in the form of letterboxes, mail slots, or postboxes. In addition to securely receiving mail, mailboxes may also provide protection against theft, weather, and vandalism.
        </p>
        <p className="mt-4">
          Mailboxes can be found in various styles and designs, including standalone units, wall-mounted boxes, and community mailboxes. They are typically made from materials such as metal, plastic, or wood. Some mailboxes may have locks or combination mechanisms for added security.
        </p>
        <p className="mt-4">
          In addition to physical mailboxes, the term "mailbox" is also commonly used in computing to refer to an electronic inbox for receiving and managing email messages. Email mailboxes allow users to send, receive, and organize digital correspondence, making communication quick and convenient.
        </p>
      </main>
     
    </div>
  );
}

export default Home;
