export default function Create() {
  return <div>
    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your title</label>
    <textarea id="title" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title"></textarea>
    <input className='flex w-full line-clamp-1 rows-5' type='text' placeholder='Titre' ></input>
    <input className='flex w-full' type='text' placeholder='Description' ></input>
    <button className='flex bg-white'>Valider</button>

  </div>

}