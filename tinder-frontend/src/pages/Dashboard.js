import Header from '../components/Header'
import TinderCards from '../components/TinderCards'
import SwipeButtons from '../components/SwipeButtons'
const Dashboard = () => {
    return(
    <div className="dashboard">
        <Header/>
        <TinderCards/>
        <SwipeButtons/>
    </div>
    )
}
export default Dashboard