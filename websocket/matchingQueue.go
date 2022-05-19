package ws

type MatchingQueue struct {
	Rate  int
	Queue []int
}

func (mq *MatchingQueue) Push(id int) {
	mq.Queue = append(mq.Queue, id)
}

func (mq *MatchingQueue) Pop() int {
	if len(mq.Queue) == 0 {
		return -1
	}
	id := mq.Queue[0]
	mq.Queue = mq.Queue[1:]
	return id
}
