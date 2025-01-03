import React, {useState} from 'react';
import {Button, Grid, Header, Menu, Radio, Segment, Sidebar, Sticky} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {MapRowItem} from './MapRowItem.tsx';
import {useSearchParams} from 'react-router-dom';

export type Deployment =
    'Hammer and Anvil'
    | 'Crucible of Battle'
    | 'Search and Destroy'
    | 'Tipping Point'
    | 'Sweeping Engagement';
export type Weight = 'Heavy' | 'Medium' | 'Light';

export interface MapInfo {
    id: number,
    deployment: Deployment,
    type?: Weight
}

const wtcMaps: MapInfo[] = [
    {id: 1, deployment: 'Search and Destroy', type: 'Medium'},
    {id: 2, deployment: 'Crucible of Battle', type: 'Medium'},
    {id: 3, deployment: 'Hammer and Anvil', type: 'Medium'},
    {id: 5, deployment: 'Search and Destroy', type: 'Medium'},
    {id: 6, deployment: 'Crucible of Battle', type: 'Medium'},
    {id: 7, deployment: 'Hammer and Anvil', type: 'Medium'},
    {id: 9, deployment: 'Search and Destroy', type: 'Medium'},
    {id: 10, deployment: 'Crucible of Battle', type: 'Medium'},
    {id: 11, deployment: 'Hammer and Anvil', type: 'Medium'},
    {id: 13, deployment: 'Search and Destroy', type: 'Medium'},
    {id: 14, deployment: 'Crucible of Battle', type: 'Medium'},
    {id: 15, deployment: 'Hammer and Anvil', type: 'Medium'},
    {id: 17, deployment: 'Search and Destroy', type: 'Heavy'},
    {id: 18, deployment: 'Crucible of Battle', type: 'Heavy'},
    {id: 19, deployment: 'Hammer and Anvil', type: 'Heavy'},
    {id: 21, deployment: 'Search and Destroy', type: 'Heavy'},
    {id: 22, deployment: 'Crucible of Battle', type: 'Heavy'},
    {id: 23, deployment: 'Hammer and Anvil', type: 'Heavy'},
    {id: 25, deployment: 'Search and Destroy', type: 'Heavy'},
    {id: 26, deployment: 'Crucible of Battle', type: 'Heavy'},
    {id: 27, deployment: 'Hammer and Anvil', type: 'Heavy'},
    {id: 29, deployment: 'Search and Destroy', type: 'Heavy'},
    {id: 30, deployment: 'Crucible of Battle', type: 'Heavy'},
    {id: 31, deployment: 'Hammer and Anvil', type: 'Heavy'},
    {id: 33, deployment: 'Search and Destroy', type: 'Light'},
    {id: 34, deployment: 'Crucible of Battle', type: 'Light'},
    {id: 35, deployment: 'Hammer and Anvil', type: 'Light'},
    {id: 37, deployment: 'Search and Destroy', type: 'Light'},
    {id: 38, deployment: 'Crucible of Battle', type: 'Light'},
    {id: 39, deployment: 'Hammer and Anvil', type: 'Light'},
    {id: 41, deployment: 'Search and Destroy', type: 'Light'},
    {id: 42, deployment: 'Crucible of Battle', type: 'Light'},
    {id: 43, deployment: 'Hammer and Anvil', type: 'Light'},
    {id: 45, deployment: 'Search and Destroy', type: 'Light'},
    {id: 46, deployment: 'Crucible of Battle', type: 'Light'},
    {id: 47, deployment: 'Hammer and Anvil', type: 'Light'},
    {id: 49, deployment: 'Tipping Point', type: 'Heavy'},
    {id: 50, deployment: 'Tipping Point', type: 'Heavy'},
    {id: 51, deployment: 'Tipping Point', type: 'Medium'},
    {id: 52, deployment: 'Tipping Point', type: 'Medium'},
    {id: 53, deployment: 'Tipping Point', type: 'Medium'},
    {id: 54, deployment: 'Tipping Point', type: 'Medium'},
    {id: 55, deployment: 'Tipping Point', type: 'Light'},
    {id: 56, deployment: 'Tipping Point', type: 'Light'},
    {id: 57, deployment: 'Sweeping Engagement', type: 'Medium'},
];

const uktcMaps: MapInfo[] = [
    {id: 1, deployment: 'Sweeping Engagement'},
    {id: 2, deployment: 'Crucible of Battle'},
    {id: 3, deployment: 'Search and Destroy'},
    {id: 4, deployment: 'Search and Destroy'},
    {id: 7, deployment: 'Crucible of Battle'},

]

const formats: {[key: string]: { supportsWeight?: boolean }} = {
    WTC: { supportsWeight: true },
    UKTC: {},
    GW: {},
}

const App: React.FC = () => {
    const [deploymentFilter, setDeploymentFilter] = useState<string>('All');
    const [typeFilter, setTypeFilter] = useState<string>('All');
    const [formatFilter, setFormatFilter] = useState<string>('WTC');
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(window.innerWidth > 768);
    const [searchParams] = useSearchParams()

    const paramMaps = searchParams.get('maps');

    const handleDeploymentChange = (value: string) => setDeploymentFilter(value);
    const handleTypeChange = (value: string) => setTypeFilter(value);
    const handleFormatChange = (value: string) => {
        setFormatFilter(value);
    };

    const maps = (formatFilter === 'WTC') ? wtcMaps : formatFilter === 'UKTC' ? uktcMaps : []

    let filteredImages: MapInfo[];

    if (paramMaps && paramMaps.split(",").length > 0) {
        filteredImages = paramMaps.split(",").map(mapId => {
            return maps.find(image => image.id === Number(mapId))
        }).filter(i => i !== undefined)
    } else {
        filteredImages = maps.filter((image) => {
            return (deploymentFilter === 'All' || image.deployment === deploymentFilter) &&
                (typeFilter === 'All' || !formats[formatFilter].supportsWeight || image.type === typeFilter);
        });
    }

    return (
        <div>
            {/* Toggle Button for Sidebar */}
            <Sticky>
                <Header>
                    <Button onClick={() => setSidebarVisible(!sidebarVisible)} style={{margin: '10px'}}>
                        {sidebarVisible ? 'Close Filters' : 'Open Filters'}
                    </Button>
                </Header>

            </Sticky>

            {/* Sidebar */}
            <Sidebar.Pushable as={Segment} style={{minHeight: '100vh'}}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    vertical
                    visible={sidebarVisible}
                    width='thin'
                >
                    <Menu.Item>
                        <Menu.Header>Deployment</Menu.Header>
                        <Menu.Menu>
                            {['All', 'Hammer and Anvil', 'Crucible of Battle', 'Search and Destroy', 'Tipping Point', 'Sweeping Engagement'].map((option) => (
                                <Menu.Item key={option}>
                                    <Radio
                                        label={option}
                                        name='deploymentFilter'
                                        checked={deploymentFilter === option}
                                        onChange={() => handleDeploymentChange(option)}
                                    />
                                </Menu.Item>
                            ))}
                        </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item>
                        <Menu.Header>Format</Menu.Header>
                        <Menu.Menu>
                            {['WTC', 'UKTC'].map((option) => (
                                <Menu.Item key={option}>
                                    <Radio
                                        label={option}
                                        name='formatFilter'
                                        checked={option === formatFilter}
                                        onChange={() => handleFormatChange(option)}
                                    />
                                </Menu.Item>
                                ))}
                        </Menu.Menu>
                    </Menu.Item>

                    {(formats[formatFilter].supportsWeight) && <Menu.Item>
                        <Menu.Header>Type</Menu.Header>
                        <Menu.Menu>
                            {['All', 'Heavy', 'Medium', 'Light'].map((option) => (
                                <Menu.Item key={option}>
                                    <Radio
                                        label={option}
                                        name='typeFilter'
                                        checked={typeFilter === option}
                                        onChange={() => handleTypeChange(option)}
                                    />
                                </Menu.Item>
                            ))}
                        </Menu.Menu>
                    </Menu.Item>}
                </Sidebar>

                {/* Main Content */}
                <Sidebar.Pusher>
                    <Segment basic>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                        {filteredImages.map((image) => (
                                            <MapRowItem key={image.id} image={image}
                                                        mapMaker={formatFilter.toLowerCase()}/>
                                        ))}

                                        {filteredImages.length == 0 && <span>No maps found :(</span>}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
);
};
export default App;
