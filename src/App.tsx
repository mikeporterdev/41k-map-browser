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
    | 'Sweeping Engagement'
    | 'Dawn of War';
export type Weight = 'Heavy' | 'Medium' | 'Light';

export interface MapInfo {
    id: number | string,
    deployment: Deployment[],
    type?: Weight
}

const wtcMaps: MapInfo[] = [
    {id: 1, deployment: ['Search and Destroy'], type: 'Medium'},
    {id: 2, deployment: ['Crucible of Battle'], type: 'Medium'},
    {id: 3, deployment: ['Hammer and Anvil'], type: 'Medium'},
    {id: 5, deployment: ['Search and Destroy'], type: 'Medium'},
    {id: 6, deployment: ['Crucible of Battle'], type: 'Medium'},
    {id: 7, deployment: ['Hammer and Anvil'], type: 'Medium'},
    {id: 9, deployment: ['Search and Destroy'], type: 'Medium'},
    {id: 10, deployment: ['Crucible of Battle'], type: 'Medium'},
    {id: 11, deployment: ['Hammer and Anvil'], type: 'Medium'},
    {id: 13, deployment: ['Search and Destroy'], type: 'Medium'},
    {id: 14, deployment: ['Crucible of Battle'], type: 'Medium'},
    {id: 15, deployment: ['Hammer and Anvil'], type: 'Medium'},
    {id: 17, deployment: ['Search and Destroy'], type: 'Heavy'},
    {id: 18, deployment: ['Crucible of Battle'], type: 'Heavy'},
    {id: 19, deployment: ['Hammer and Anvil'], type: 'Heavy'},
    {id: 21, deployment: ['Search and Destroy'], type: 'Heavy'},
    {id: 22, deployment: ['Crucible of Battle'], type: 'Heavy'},
    {id: 23, deployment: ['Hammer and Anvil'], type: 'Heavy'},
    {id: 25, deployment: ['Search and Destroy'], type: 'Heavy'},
    {id: 26, deployment: ['Crucible of Battle'], type: 'Heavy'},
    {id: 27, deployment: ['Hammer and Anvil'], type: 'Heavy'},
    {id: 29, deployment: ['Search and Destroy'], type: 'Heavy'},
    {id: 30, deployment: ['Crucible of Battle'], type: 'Heavy'},
    {id: 31, deployment: ['Hammer and Anvil'], type: 'Heavy'},
    {id: 33, deployment: ['Search and Destroy'], type: 'Light'},
    {id: 34, deployment: ['Crucible of Battle'], type: 'Light'},
    {id: 35, deployment: ['Hammer and Anvil'], type: 'Light'},
    {id: 37, deployment: ['Search and Destroy'], type: 'Light'},
    {id: 38, deployment: ['Crucible of Battle'], type: 'Light'},
    {id: 39, deployment: ['Hammer and Anvil'], type: 'Light'},
    {id: 41, deployment: ['Search and Destroy'], type: 'Light'},
    {id: 42, deployment: ['Crucible of Battle'], type: 'Light'},
    {id: 43, deployment: ['Hammer and Anvil'], type: 'Light'},
    {id: 45, deployment: ['Search and Destroy'], type: 'Light'},
    {id: 46, deployment: ['Crucible of Battle'], type: 'Light'},
    {id: 47, deployment: ['Hammer and Anvil'], type: 'Light'},
    {id: 49, deployment: ['Tipping Point'], type: 'Heavy'},
    {id: 50, deployment: ['Tipping Point'], type: 'Heavy'},
    {id: 51, deployment: ['Tipping Point'], type: 'Medium'},
    {id: 52, deployment: ['Tipping Point'], type: 'Medium'},
    {id: 53, deployment: ['Tipping Point'], type: 'Medium'},
    {id: 54, deployment: ['Tipping Point'], type: 'Medium'},
    {id: 55, deployment: ['Tipping Point'], type: 'Light'},
    {id: 56, deployment: ['Tipping Point'], type: 'Light'},
    {id: 57, deployment: ['Sweeping Engagement'], type: 'Medium'},
];

const uktcMaps: MapInfo[] = [
    {id: 1, deployment: ['Sweeping Engagement']},
    {id: 2, deployment: ['Crucible of Battle']},
    {id: 3, deployment: ['Search and Destroy']},
    {id: 4, deployment: ['Search and Destroy']},
    {id: 7, deployment: ['Crucible of Battle']},
]

const gwMaps: MapInfo[] = [
    {id: 1, deployment: ['Tipping Point', 'Hammer and Anvil', 'Search and Destroy', 'Crucible of Battle']},
    {id: 2, deployment: ['Tipping Point', 'Search and Destroy', 'Crucible of Battle']},
    {id: 3, deployment: ['Sweeping Engagement']},
    {id: 4, deployment: ['Tipping Point', 'Search and Destroy', 'Crucible of Battle']},
    {id: 5, deployment: ['Sweeping Engagement', 'Dawn of War']},
    {id: 6, deployment: ['Tipping Point', 'Search and Destroy', 'Crucible of Battle']},
    {id: 7, deployment: ['Tipping Point', 'Hammer and Anvil']},
    {id: 8, deployment: ['Tipping Point', 'Hammer and Anvil', 'Crucible of Battle']},
]

const wtc2025Maps: MapInfo[] = [
    { id: 'search1', deployment: ['Search and Destroy']},
    { id: 'search2', deployment: ['Search and Destroy']},
    { id: 'search3', deployment: ['Search and Destroy']},
    { id: 'search45', deployment: ['Search and Destroy']},
    { id: 'search6', deployment: ['Search and Destroy']},
    { id: 'search7', deployment: ['Search and Destroy']},
    { id: 'search8', deployment: ['Search and Destroy']},
    { id: 'crucible1', deployment: ['Crucible of Battle']},
    { id: 'crucible2', deployment: ['Crucible of Battle']},
    { id: 'crucible3', deployment: ['Crucible of Battle']},
    { id: 'crucible45', deployment: ['Crucible of Battle']},
    { id: 'crucible6', deployment: ['Crucible of Battle']},
    { id: 'crucible7', deployment: ['Crucible of Battle']},
    { id: 'crucible8', deployment: ['Crucible of Battle']},
    { id: 'hammer1', deployment: ['Hammer and Anvil']},
    { id: 'hammer2', deployment: ['Hammer and Anvil']},
    { id: 'hammer3', deployment: ['Hammer and Anvil']},
    { id: 'hammer45', deployment: ['Hammer and Anvil']},
    { id: 'hammer6', deployment: ['Hammer and Anvil']},
    { id: 'hammer7', deployment: ['Hammer and Anvil']},
    { id: 'hammer8', deployment: ['Hammer and Anvil']},
    { id: 'tipping1', deployment: ['Tipping Point']},
    { id: 'tipping2', deployment: ['Tipping Point']},
    { id: 'tipping3', deployment: ['Tipping Point']},
    { id: 'tipping45', deployment: ['Tipping Point']},
    { id: 'tipping6', deployment: ['Tipping Point']},
    { id: 'tipping7', deployment: ['Tipping Point']},
    { id: 'tipping8', deployment: ['Tipping Point']},
    { id: 'sweeping1', deployment: ['Sweeping Engagement']},
    { id: 'sweeping2', deployment: ['Sweeping Engagement']},
    { id: 'sweeping3', deployment: ['Sweeping Engagement']},
    { id: 'sweeping4', deployment: ['Sweeping Engagement']},
    { id: 'sweeping5', deployment: ['Sweeping Engagement']},
    { id: 'sweeping6', deployment: ['Sweeping Engagement']},
    { id: 'dawn1', deployment: ['Dawn of War']},
    { id: 'dawn2', deployment: ['Dawn of War']},
    { id: 'dawn3', deployment: ['Dawn of War']},
    { id: 'dawn4', deployment: ['Dawn of War']},
    { id: 'dawn5', deployment: ['Dawn of War']},
    { id: 'dawn6', deployment: ['Dawn of War']},

]

const formats: {[key: string]: { supportsWeight?: boolean, folderKey: string }} = {
    'WTC 2024': { supportsWeight: true, folderKey: 'wtc2024' },
    'WTC 2025': { supportsWeight: false, folderKey: 'wtc2025' },
    UKTC: {folderKey: 'uktc'},
    GW: {folderKey: 'gw'},
}

function mapFormat(filterStr: string): MapInfo[] {
    switch (filterStr) {
        case 'WTC 2024': return wtcMaps;
        case 'WTC 2025': return wtc2025Maps;
        case 'UKTC': return uktcMaps;
        case 'GW': return gwMaps;
        default: return [];
    }
}

const App: React.FC = () => {
    const [searchParams] = useSearchParams()
    const [deploymentFilter, setDeploymentFilter] = useState<string>('All');
    const [typeFilter, setTypeFilter] = useState<string>('All');
    const paramFormat = searchParams.get('format');
    const [formatFilter, setFormatFilter] = useState<string>(paramFormat != null ? paramFormat : 'WTC 2025');
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(window.innerWidth > 768);

    const paramMaps = searchParams.get('maps');

    const handleDeploymentChange = (value: string) => setDeploymentFilter(value);
    const handleTypeChange = (value: string) => setTypeFilter(value);
    const handleFormatChange = (value: string) => {
        setFormatFilter(value);
    };



    const maps = mapFormat(formatFilter)

    let filteredImages: MapInfo[];

    if (paramMaps && paramMaps.split(",").length > 0) {
        filteredImages = paramMaps.split(",").map(mapId => {
            return maps.find(image => image.id === Number(mapId))
        }).filter(i => i !== undefined)
    } else {
        filteredImages = maps.filter((mapInfoItem) => {
            return (deploymentFilter === 'All' || mapInfoItem.deployment.includes(deploymentFilter as Deployment)) &&
                (typeFilter === 'All' || !formats[formatFilter].supportsWeight || mapInfoItem.type === typeFilter);
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
                            {['All', 'Hammer and Anvil', 'Crucible of Battle', 'Search and Destroy', 'Tipping Point', 'Sweeping Engagement', 'Dawn of War'].map((option) => (
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
                            {['WTC 2025', 'WTC 2024', 'UKTC', 'GW'].map((option) => (
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
                                                        mapMaker={formats[formatFilter].folderKey}/>
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
