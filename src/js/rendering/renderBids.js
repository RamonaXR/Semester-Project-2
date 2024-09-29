export function renderBids(bids) {
  const info = document.createElement('p');
  info.classList.add('text-center', 'font-bold');
  info.textContent = 'No bids yet';
  if (!bids.length) return info;

  const bidsContainer = document.createElement('div');

  const title = document.createElement('h3');
  title.classList.add('text-center', 'font-bold');
  title.textContent = 'Current Bids:';
  bidsContainer.appendChild(title);

  const bidsList = document.createElement('ul');

  bids.forEach((bid) => {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'justify-between', 'items-center', 'mb-2');

    const bidderContainer = document.createElement('div');
    bidderContainer.classList.add('flex', 'items-center');

    const avatar = document.createElement('img');
    avatar.src = bid.bidder.avatar.url;
    avatar.alt = `${bid.bidder.name}'s avatar`;
    avatar.classList.add('h-8', 'w-8', 'rounded-full', 'mr-2');

    const name = document.createElement('span');
    name.textContent = bid.bidder.name;

    const bidAmount = document.createElement('span');
    bidAmount.textContent = `${bid.amount} credits`;

    bidderContainer.appendChild(avatar);
    bidderContainer.appendChild(name);

    listItem.appendChild(bidderContainer);
    listItem.appendChild(bidAmount);

    bidsList.appendChild(listItem);
  });

  bidsContainer.appendChild(bidsList);

  return bidsContainer;
}
